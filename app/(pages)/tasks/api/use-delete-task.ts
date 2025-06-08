import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, Task } from "@/libs/supabase/entities.types";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: Task["id"]) => {
      const { error } = await supabase
        .from(TableName.TASKS)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTasks"] });
    },
  });
}
