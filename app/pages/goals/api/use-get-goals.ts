import { supabase } from "@/app/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";

type Goal = {
  id: string;
  title: string;
  total: number;
};

export function useGetGoals() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery<Goal[]>({
    enabled: !!currentUser,
    queryKey: ["useGetGoals"],
    queryFn: async () => {
      const { data } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", currentUser?.id);
      return data ? data : [];
    },
  });
}
