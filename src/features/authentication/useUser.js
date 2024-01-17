import { useQuery } from "@tanstack/react-query";
export function User() {
  const { isLoading, data: user } = useQuery({});
}
