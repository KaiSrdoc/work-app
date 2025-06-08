import { supabase } from "@/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { TableName, Work } from "@/libs/supabase/entities.types";

export function useUpsertWork() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<Work, "user_id" | "created_at" | "id">) => {
      const { error } = await supabase.from(TableName.WORK).upsert({
        ...entry,
        user_id: currentUser?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetWork"] });
    },
  });
}
