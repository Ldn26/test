import React, { useState } from "react";
import { Trash2, Edit3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GetOrderPopUp from "./GetOrderPopUp";
import { useDeleteOrder } from "@/api/Order";
function OrderTableItem({ order }) {
  const [openModel, setOpenModel] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);

  const { deleteOrder, isLoading: deleteLoading } = useDeleteOrder();

  const handleDelete = (id: number) => {
    deleteOrder(id);
    setOpenModel(false);
    setAllowEdit(false);
  };

  const getStatusColor = () => {
    if (order.status === "En attente") return "bg-amber-500";
    if (order.status === "Expédiée") return "bg-blue-500";
    if (order.status === "Livrée") return "bg-green-600";
    return "bg-gray-400";
  };

  return (
    <>
      {openModel && (
        <GetOrderPopUp
          allowEdit={allowEdit}
          deleteOrder={handleDelete}
          deleteLoading={deleteLoading}
          setOpenModel={setOpenModel}
          order={order}
          id={order.id}
        />
      )}

      <button onClick={() => setOpenModel(true)} className="w-full">
        <Card className="w-full hover:brightness-95 transition-all animate-fade-in-up rounded-xl shadow-sm border border-[#d7cfc8]">
          <CardContent className="flex items-center justify-between p-3 gap-2">
            <div className="flex-1 text-left text-xs sm:text-md sm:w-1/5    font-semibold">
              {order?.User?.name}
            </div>
        

            {/* Date */}
            <div className="flex-1 hidden sm:flex justify-center items-center text-xs sm:text-md sm:w-1/5">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>

            {/* Phone */}
            <div className="flex-1 flex justify-center items-center text-xs sm:text-md sm:w-1/5">
              {order.phoneNbr || "-"}
            </div>

            {/* Total Price */}
            <div className="flex-1 hidden sm:flex justify-center items-center text-xs sm:text-md sm:w-1/5 font-bold">
              €
              {order.Products.reduce(
                (total, prod) =>
                  total + prod.price * prod.OrderProduct.quantity,
                0
              ).toFixed(2)}
            </div>

            {/* Status */}
            <div className="flex-1 flex justify-center items-center sm:w-1/5">
              <span
                className={`${getStatusColor()} text-white px-2 sm:px-4 py-1 rounded-full text-[10px] sm:text-sm`}
              >
                {order.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex-1 flex justify-end gap-2 sm:w-1/5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(order.id);
                }}
                className="text-destructive hover:scale-110 transition-all bg-white flex items-center justify-center rounded-md p-1 border shadow-sm"
              >
                <Trash2 className="sm:h-6 w-4 h-4 sm:w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAllowEdit(true);
                  setOpenModel(true);
                }}
                className="text-primary hover:scale-110 transition-all bg-white flex items-center justify-center rounded-md p-1 border shadow-sm"
              >
                <Edit3 className="sm:h-6 w-4 h-4 sm:w-6" />
              </button>
            </div>
          </CardContent>
        </Card>
      </button>
    </>
  );
}

export default OrderTableItem;
