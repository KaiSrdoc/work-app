import { supabase } from "@/app/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";

type WorkEntry = {
  id?: number;
  work_date: string;
  hours_worked: number;
  money_earned: number;
  goal_id: number;
  user_id: number;
};

export function useUpsertWorkEntry() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<WorkEntry, "user_id">) => {
      const { error } = await supabase.from("work_entries").upsert({
        ...entry,
        user_id: currentUser?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetWorkEntries"] });
    },
  });
}
