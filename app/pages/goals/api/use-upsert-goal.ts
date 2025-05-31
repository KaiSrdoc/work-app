import { supabase } from "@/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { Goal } from "@/libs/supabase/entities.types";

export function useUpsertGoal() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: Omit<Goal, "user_id" | "created_at" | "id">) => {
      const { error } = await supabase.from("goals").upsert({
        ...goal,
        user_id: currentUser?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetGoals"] });
    },
  });
}
