import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, Task } from "@/libs/supabase/entities.types";
import { useGetCurrentUser } from "../../users/api/use-get-user";

interface TaskInput {
  title: string;
  description: string;
  status: string;
  project_id: number | null;
  owner_ids: number[];
}

export function useUpsertTask() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();

  return useMutation({
    mutationFn: async ({ id, ...data }: TaskInput & { id?: Task["id"] }) => {
      // Ensure current user is always included in owner_ids for new tasks
      const taskData = {
        ...data,
        owner_ids: id
          ? data.owner_ids
          : [
              ...new Set(
                [...(data.owner_ids || []), currentUser?.id].filter(Boolean)
              ),
            ],
      };

      if (id) {
        const { error } = await supabase
          .from(TableName.TASKS)
          .update(taskData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(TableName.TASKS).insert(taskData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTasks"] });
    },
  });
}
