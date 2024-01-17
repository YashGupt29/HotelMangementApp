import React from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err.message);
      toast.error("Provided email and password are incorrect");
    },
  });
  return { login, isLoading };
}
