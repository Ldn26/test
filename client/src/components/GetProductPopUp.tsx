import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import { useProduct, useDeleteProduct, useEditProduct } from "../api/Products";
import { useToast } from "@/hooks/use-toast";
import categories from "../data/categories";

function GetProductPopUp({
  setOpenModel,
  id,
  deleteProduct,
  DeleteLoader,
  allowEdit,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  deleteProduct: ReturnType<typeof useDeleteProduct>["mutate"];
  DeleteLoader: boolean;
  allowEdit: boolean;
}) {
  const { updateProduct, isLoading: EditLoading } = useEditProduct();
  const { toast } = useToast();

  // Form fields excluding images
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: 0,
    quantity: 0,
    category: "",
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });

  // Existing images URLs from backend
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // New files uploaded (File objects)
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // Base64 previews of newFiles
  const [newFilesPreviews, setNewFilesPreviews] = useState<string[]>([]);

  const handelEdit = async (productId: number) => {
    if (!formData.name || !formData.desc || !formData.category) {
      toast({
        variant: "destructive",
        title: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append("name", formData.name);
      formPayload.append("desc", formData.desc);
      formPayload.append(
        "price",
        formData.price != null ? formData.price.toString() : "0"
      );
      formPayload.append(
        "quantity",
        formData.quantity != null ? formData.quantity.toString() : "0"
      );
      formPayload.append("category", formData.category);

      if (formData.width != null)
        formPayload.append("width", formData.width.toString());
      if (formData.height != null)
        formPayload.append("height", formData.height.toString());

      // Append existing images URLs as JSON string
      formPayload.append("finalImages", JSON.stringify(existingImages));

      // Append new uploaded files (File objects)
      newFiles.forEach((file) => {
        formPayload.append("images", file);
      });

      updateProduct({
        productId,
        productData: formPayload,
      });

      setCanEdit(false);
      setOpenModel(false);

      toast({
        title: "Produit modifié avec succès !",
        description: "Les modifications ont été enregistrées.",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la modification du produit.",
        description: "Veuillez réessayer plus tard.",
      });
    }
  };

  const { data: product, isLoading, isError } = useProduct(id);
  const [canEdit, setCanEdit] = useState(false);

  // Handle new file uploads and generate previews
  const saveImagesToFormData = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...filesArray]);

    const previews = await Promise.all(
      filesArray.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    );

    setNewFilesPreviews((prev) => [...prev, ...previews]);
  };

  useEffect(() => {
    if (allowEdit) {
      setCanEdit(true);
      setOpenModel(true);
    }
  }, [allowEdit, setOpenModel]);

  // When product data loads, populate form and images
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        desc: product.desc,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        width: product.width,
        height: product.height,
      });

      // Separate existing images URLs
      setExistingImages(
        product.imageUrl.map((i) => (typeof i === "string" ? i : i.url))
      );

      setNewFiles([]);
      setNewFilesPreviews([]);
    }
  }, [product]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Erreur lors du chargement du produit.</div>;

  return (
    <div className="fixed inset-0 overflow-y-scroll z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <Card className="relative animate-fade-in-up w-full max-w-3xl mx-2 max-h-[90vh] overflow-y-auto">
        <button
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
          onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="red" size={20} />
        </button>
        <CardHeader>
          <CardTitle>Produit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!canEdit}
              />
            </div>
            {/* Desc */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                rows={3}
                disabled={!canEdit}
              />
            </div>
            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
            </div>
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                disabled={!canEdit}
                className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="image">Images du produit</Label>

              {canEdit && (
                <div className="relative">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={saveImagesToFormData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm flex items-center justify-center hover:bg-blue-50 transition-all cursor-pointer">
                    <span className="text-gray-700 font-bold">
                      Choisir des images
                    </span>
                  </div>
                </div>
              )}

              {(existingImages.length > 0 || newFilesPreviews.length > 0) && (
                <div className="mt-2">
                  <div
                    className="flex overflow-x-scroll gap-2 scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {existingImages.map((img, idx) => (
                      <div
                        key={`existing-${idx}`}
                        className="relative w-[200px] h-[200px] flex-shrink-0 snap-start"
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Existing Preview ${idx}`}
                          className="w-full h-full object-cover rounded"
                        />
                        {canEdit && (
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-800"
                            onClick={() =>
                              setExistingImages(
                                existingImages.filter((_, i) => i !== idx)
                              )
                            }
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                    {newFilesPreviews.map((img, idx) => (
                      <div
                        key={`new-${idx}`}
                        className="relative w-[200px] h-[200px] flex-shrink-0 snap-start"
                      >
                        <img
                          src={img}
                          alt={`New Preview ${idx}`}
                          className="w-full h-full object-cover rounded"
                        />
                        {canEdit && (
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-800"
                            onClick={() => {
                              setNewFiles(newFiles.filter((_, i) => i !== idx));
                              setNewFilesPreviews(
                                newFilesPreviews.filter((_, i) => i !== idx)
                              );
                            }}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-2">
              {!canEdit ? (
                <div
                  className="w-full bg-primary cursor-pointer p-2 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  onClick={() => setCanEdit(true)}
                >
                  Editer le Produit
                </div>
              ) : (
                <div
                  className="w-full bg-green-700 cursor-pointer p-2 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  onClick={() => handelEdit(product.id)}
                >
                  {EditLoading ? "Modification en cours..." : "Sauvegarder "}
                </div>
              )}

              <div
                className={`w-full bg-red-700 p-2 text-white ${
                  DeleteLoader
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer opacity-100"
                } rounded-xl flex items-center justify-center hover:scale-105 transition-all`}
                onClick={() => deleteProduct(id)}
              >
                {DeleteLoader
                  ? "Supprision en cours..."
                  : "Supprimer le Produit"}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetProductPopUp;
