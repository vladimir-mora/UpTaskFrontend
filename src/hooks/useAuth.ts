import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};
