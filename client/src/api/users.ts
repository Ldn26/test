import api from "./axiosIntercepter";
import { useQuery,   } from "@tanstack/react-query";



export const useUsersNumber = () => {
  const query = useQuery<{
    users: number;
    productscount: number; count: number 
}>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users_nbr");
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



export const useNotificationNumber = () => {
  const query = useQuery<{
    users: number;
    productscount: number; count: number 
}>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/contacts/count");
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