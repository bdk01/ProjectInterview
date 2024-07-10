import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";
import { ConvertStringtoObject } from "@/lib/utils";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form) => {
      //send api update request here

      const { data } = await axios.post("/api/user/createUser", form);
      return data
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.patch("/api/user/updateUser", form);
      return data
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log(id);
      const { data } = await axios.delete(`/api/user/deleteUser/${id}`);
      console.log(data);
      /*   const res = await appRequestHandler.UserRequestHandler.deleteUser({
        type,
        User_id
      })
      if (res.success) {
        notiSuccess(res.message)
      } else if (!res.success) {
        notiError(res.message)
      } */
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useGetUsers({
  sort,
  search,
  pageIndex,
  pageSize,
  filterRole,
 
}) {
  const fetchURL = new URL(
    "/api/getUser",
    import.meta.env.NODE_ENV === "production" ? "/" : "http://localhost:8000"
  );
  fetchURL.searchParams.set("page", `${pageIndex}`);
  fetchURL.searchParams.set("pageSize", `${pageSize}`);

  search && fetchURL.searchParams.set("search", search ?? "");

  filterRole && fetchURL.searchParams.set("role", filterRole ?? "");
  console.log(sort)
  sort && fetchURL.searchParams.set("sort", sort?? []);

  return useQuery({
    queryKey: ["users", fetchURL.search],
    queryFn: async () => {
      console.log(fetchURL.search);
      let options = ConvertStringtoObject(fetchURL.search);
      
      console.log(options);
      const { data } = await axios.get("/api/user/getUsers", {
        params: options,
      });
      console.log(data);
      return data;
    },

    staleTime: 20000,
  });
}
