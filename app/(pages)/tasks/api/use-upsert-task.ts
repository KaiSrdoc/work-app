import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, Task } from "@/libs/supabase/entities.types";

interface TaskInput {
  title: string;
  description: string;
}

export function useUpsertTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: TaskInput & { id?: Task["id"] }) => {
      if (id) {
        const { error } = await supabase
          .from(TableName.TASKS)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(TableName.TASKS).insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTasks"] });
    },
  });
}
