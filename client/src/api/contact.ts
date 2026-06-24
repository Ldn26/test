// import api from "./axiosIntercepter";
// import { useMutation, useQuery } from "@tanstack/react-query";

// type Disponibilite = {
//   jour: string;
//   heure: string;
//   minute: string;
// };

// type ContactPayload = {
//   civilite: string;
//   nom: string;
//   prenom: string;
//   email: string;
//   telephone: string;
//   motif: string;
//   message: string;
//   disponibilites: Disponibilite[];
// };

// type Contact = ContactPayload & {
//   id: number;
//   isRead: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

// export const useCreateContact = () => {
//   const mutation = useMutation({
//     mutationFn: async (payload: ContactPayload) => {
//       const res = await api.post("/contacts", payload);
//       return res.data;
//     },
//   });

//   return {
//     mutate: mutation.mutate,
//     mutateAsync: mutation.mutateAsync,
//     isLoading: mutation.isPending,
//     isSuccess: mutation.isSuccess,
//     isError: mutation.isError,
//     error: mutation.error,
//   };
// };

// export const useGetAllContacts = () => {
//   const query = useQuery<{ contacts: Contact[] }>({
//     queryKey: ["contacts"],
//     queryFn: async () => {
//       const res = await api.get("/contacts");
//       return res.data;
//     },
//   });

//   return {
//     data: query.data,
//     isLoading: query.isLoading,
//     isSuccess: query.isSuccess,
//     isError: query.isError,
//     refetch: query.refetch,
//   };
// };

// export const useGetContactById = (id: number) => {
//   const query = useQuery<{ contact: Contact }>({
//     queryKey: ["contacts", id],
//     queryFn: async () => {
//       const res = await api.get(`/contacts/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   return {
//     data: query.data,
//     isLoading: query.isLoading,
//     isSuccess: query.isSuccess,
//     isError: query.isError,
//   };
// };

// export const useDeleteContact = () => {
//   const mutation = useMutation({
//     mutationFn: async (id: number) => {
//       const res = await api.delete(`/contacts/${id}`);
//       return res.data;
//     },
//   });

//   return {
//     mutate: mutation.mutate,
//     mutateAsync: mutation.mutateAsync,
//     isLoading: mutation.isPending,
//     isSuccess: mutation.isSuccess,
//     isError: mutation.isError,
//   };
// };

// export const useUpdateContactStatus = () => {
//   const mutation = useMutation({
//     mutationFn: async ({ id, isRead }: { id: number; isRead: boolean }) => {
//       const res = await api.patch(`/contacts/${id}/read`, { isRead });
//       return res.data;
//     },
//   });

//   return {
//     mutate: mutation.mutate,
//     mutateAsync: mutation.mutateAsync,
//     isLoading: mutation.isPending,
//     isSuccess: mutation.isSuccess,
//     isError: mutation.isError,
//   };
// };


import api from "./axiosIntercepter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Disponibilite = {
  jour: string;
  heure: string;
  minute: string;
};

type ContactPayload = {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motif: string;
  message: string;
  disponibilites: Disponibilite[];
};

type Contact = ContactPayload & {
  id: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: ContactPayload) => {
      const res = await api.post("/contacts", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export const useGetAllContacts = () => {
  const query = useQuery<{ contacts: Contact[] }>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await api.get("/contacts");
      return res.data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useGetContactById = (id: number) => {
  const query = useQuery<{ contact: Contact }>({
    queryKey: ["contacts", id],
    queryFn: async () => {
      const res = await api.get(`/contacts/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/contacts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      // Removes the contact from the list immediately after delete
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: number; isRead: boolean }) => {
      const res = await api.patch(`/contacts/${id}/read`, { isRead });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // Refreshes both the list and the individual contact cache
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contacts", variables.id] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};