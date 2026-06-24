import api from "./axiosIntercepter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import  { CreateOrderProduct, OrderType } from "../../types/allTypes";
interface OrdersResponse {
  orders: OrderType[];
}

export const useOrders = () => {
  const query = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data as OrdersResponse;
    },
  });

  return {
    data: query.data?.orders || [] , 
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
};






 export const useOrdersClient = () => {
  const query = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders/users/" );
      return res.data as OrdersResponse;
    }
    ,
  });
  return {
    data: query.data?.orders || [],
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
}








export const UseorderNumber = () => {
  const query = useQuery<{
    orderCount: number;
    count: number;
  }>({
    queryKey: ["orderNumber"],
    queryFn: async () => {
      const res = await api.get("/orders/count");
      return res.data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    OrderType,
    Error,
    { orderId: number,  status: string }
  >({
    mutationFn: async ({ orderId, status }) => {   
      if (!orderId) throw new Error("Order ID is required");

      
      const res = await api.patch(`/order/status/${orderId}`, { status });
      return res.data as OrderType;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId],
      });
    },
  });

  return {
    updateStatus: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
  

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateOrderProduct, Error, CreateOrderProduct>({
    mutationFn: async (orderData) => {
      const res = await api.post("/order", orderData);
      return res.data as CreateOrderProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    createOrder: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,

  };
};

export const useDeleteOrderOld = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<OrderType, Error, number>({
    mutationFn: async (id) => {
      const res = await api.delete(`/order/${id}`);
      return res.data as OrderType;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });

  return {
    deleteOrder: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};



export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<OrderType, Error, number>({
    mutationFn: async (id) => {
      const res = await api.delete(`/order/${id}`);
      return res.data as OrderType;
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData<{ orders: OrderType[] }>(
        ["orders"],
        (oldData) => {
          if (!oldData) return { orders: [] };
          return {
            ...oldData,
            orders: oldData.orders.filter((o) => o.id !== id),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });

  return {
    deleteOrder: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};






// interface FilterProductParams {
//   name?: string;
//   category?: string;
//   page?: number;
//   limit?: number;
// }

// interface FilterProductResponse {
//   products: ProductType[];
//   total: number;
//   totalPages: number;
//   page: number;
// }

// export const useFilterProduct = ({
//   name = "",
//   category = "all",
//   page = 1,
//   limit = 10,
// }: FilterProductParams) => {
//   const query = useQuery<FilterProductResponse>({
//     queryKey: ["products", name, category, page, limit],
//     queryFn: async () => {
//       const params: Record<string, unknown> = { page, limit };
//       if (name) params.name = name;
//       if (category && category !== "all") params.category = category;

//       const res = await api.get("/products/filter", { params });
//       return res.data as FilterProductResponse;
//     },
//     staleTime: 5000,
//   });

//   return {
//     products: query.data?.products || [],
//     total: query.data?.total || 0,
//     totalPages: query.data?.totalPages || 1,
//     page: query.data?.page || 1,
//     isLoading: query.isLoading,
//     refetch: query.refetch,
//     isSuccess: query.isSuccess,
//   };
// };
