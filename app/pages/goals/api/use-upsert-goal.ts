import { supabase } from "@/app/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";

type Goal = {
  id?: number;
  title: string;
  total: number;
  user_id?: number;
};

export function useUpsertGoal() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: Omit<Goal, "user_id">) => {
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
