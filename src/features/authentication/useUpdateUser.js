import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User Account successfully updated");
      //   console.log(user);
      queryClient.setQueryData(["user"], user);
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}
