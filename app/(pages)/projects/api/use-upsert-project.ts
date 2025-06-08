import { supabase } from "@/libs/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { Project, TableName } from "@/libs/supabase/entities.types";

export function useUpsertProject() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      project: Omit<Project, "owner_ids" | "created_at" | "id">
    ) => {
      const { error } = await supabase.from(TableName.PROJECTS).upsert({
        ...project,
        owner_ids: [currentUser?.id],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetProjects"] });
    },
  });
}
