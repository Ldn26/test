import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  IoCloseCircleOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { useToast } from "@/hooks/use-toast";
import { OrderType } from "types/allTypes";
import { useUpdateStatus } from "@/api/Order";

function GetOrderPopUp({
  setOpenModel,
  id,
  order,
  allowEdit,
  deleteLoading,
  deleteOrder,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  order: OrderType;
  allowEdit: boolean;
  deleteOrder: (id: number) => void;
  deleteLoading: boolean;
}) {
  const { toast } = useToast();
  const [canEdit, setCanEdit] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    if (allowEdit) {
      setCanEdit(true);
      setOpenModel(true);
    }
  }, []);

  const { updateStatus, isLoading: isStatusChanging } = useUpdateStatus();

  const [formData, setFormData] = useState({
    status: order.status,
  });

  const handelEditStatus = async () => {
    if (!formData.status) {
      toast({
        variant: "destructive",
        title: "Veuillez remplir le champs Status",
      });
      return;
    } 


   
    try {
      await updateStatus({ orderId: order.id, status: formData.status });
      toast({
        title: "Status modifié avec succès !",
      });
      setCanEdit(false);
      setOpenModel(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la modification du status",
      });
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div className="absolute inset-0 bg-black/50"></div>
      <Card className="relative animate-fade-in-up w-full max-w-4xl">
        <div
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
          onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="black" size={24} />
        </div>

        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold">
            Détails de la Commande
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[80vh] space-y-4">
          <form className="space-y-4">
            {/* CUSTOMER INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du Client</Label>
                <Input value={order.User.name} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro du Client</Label>
                <a
                  href={`tel:${order.phoneNbr}`}
                  className="block w-full border rounded-md px-3 py-2 text-sm sm:text-base bg-white shadow-sm hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {order.phoneNbr || "-"}
                </a>
              </div>
            </div>

            {/* TOTAL PRICE AND STATUS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix Total (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={order.Products.reduce(
                    (total, prod) =>
                      total + prod.price * prod.OrderProduct.quantity,
                    0
                  )}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  disabled={!canEdit}
                  className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["En attente", "Expédiée", "Livrée"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="space-y-2">
              <Label>Produits</Label>
              <div className="w-full border rounded-md divide-y">
                {/* TABLE HEADER */}
                <div className="hidden sm:grid grid-cols-5 bg-gray-100 p-2 font-semibold text-sm">
                  <div>Nom</div>
                  <div>Catégorie</div>
                  <div>Prix (€)</div>
                  <div>Quantité</div>
                  <div>Total (€)</div>
                </div>

                {/* TABLE ROWS */}
                {order.Products.map((prod) => {
                  const isExpanded = expandedRows.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      className="group border-b p-2 sm:p-0 cursor-pointer"
                      onClick={() => toggleRow(prod.id)}
                    >
                      <div className="hidden sm:grid grid-cols-5 items-center p-2 hover:bg-gray-50 transition-all">
                        <div>{prod.name}</div>
                        <div>{prod.category}</div>
                        <div>€{prod.price.toFixed(2)}</div>
                        <div>{prod.OrderProduct.quantity}</div>
                        <div>
                          €
                          {(prod.price * prod.OrderProduct.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* MOBILE VIEW */}
                      <div className="sm:hidden flex flex-col gap-1 p-2 bg-white rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{prod.name}</span>
                          {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
                        </div>
                        {isExpanded && (
                          <div className="mt-1 text-sm space-y-1">
                            <p>Catégorie: {prod.category}</p>
                            <p>Prix unitaire: €{prod.price.toFixed(2)}</p>
                            <p>Quantité: {prod.OrderProduct.quantity}</p>
                            <p className="font-bold">
                              Total: €
                              {(
                                prod.price * prod.OrderProduct.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              {!canEdit ? (
                <div 
                  className="w-full bg-primary text-white p-2 rounded-xl text-center hover:scale-105 transition-all"
                  onClick={() => setCanEdit(true)}
                >
                  Editer le Status
                </div>
              ) : (
                <div
                  className={` ${
                    isStatusChanging ? "cursor-not-allowed" : "cursor-pointer"
                  }  w-full bg-green-700 text-white  text-center p-2 rounded-xl hover:scale-105 transition-all`}
                  onClick={handelEditStatus}
                  // disabled={isStatusChanging}
                >
                  {isStatusChanging ? "Modification..." : "Sauvegarder"}
                </div>
              )}

              <div
                className={` ${
                  deleteLoading ? "cursor-not-allowed" : "cursor-pointer"
                }  w-full bg-red-600 text-white p-2  text-center      rounded-xl hover:scale-105 transition-all  `}
                onClick={() => deleteOrder(order.id)}
              >
                {deleteLoading ? "Suppression..." : "Supprimer la Commande"}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetOrderPopUp;
