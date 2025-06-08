import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { Goal, TableName } from "@/libs/supabase/entities.types";

export function useGetGoals() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery<Goal[]>({
    enabled: !!currentUser,
    queryKey: ["useGetGoals"],
    queryFn: async () => {
      const { data } = await supabase
        .from(TableName.GOALS)
        .select("*")
        .eq("user_id", currentUser?.id)
        .order("created_at", { ascending: true });
      return data ? data : [];
    },
  });
}
