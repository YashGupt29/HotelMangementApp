import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Accound successfully created!Please verify the new account from the user's email address"
      );
    },
  });
  return { signup, isLoading };
}
