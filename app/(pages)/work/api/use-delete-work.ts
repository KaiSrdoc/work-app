import { TableName } from "@/libs/supabase/entities.types";
import { supabase } from "@/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from(TableName.WORK)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetWork"] });
    },
  });
}
