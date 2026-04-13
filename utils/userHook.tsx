import { profileAPI } from "@/services/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileAPI,
    select: (res) => res?.user,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};