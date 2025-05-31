import { supabase } from "@/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { WorkEntry } from "@/libs/supabase/entities.types";

export function useUpsertWorkEntry() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      entry: Omit<WorkEntry, "user_id" | "created_at" | "id">
    ) => {
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
