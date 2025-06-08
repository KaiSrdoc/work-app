import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { Project, TableName } from "@/libs/supabase/entities.types";

export function useGetProjects() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery<Project[]>({
    enabled: !!currentUser,
    queryKey: ["useGetProjects"],
    queryFn: async () => {
      const { data } = await supabase
        .from(TableName.PROJECTS)
        .select("*")
        .contains("owner_ids", [currentUser?.id])
        .order("created_at", { ascending: true });
      return data ? data : [];
    },
  });
}
