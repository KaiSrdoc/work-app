import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, Task } from "@/libs/supabase/entities.types";
import { useGetCurrentUser } from "../../users/api/use-get-user";

export function useGetTasks() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["useGetTasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TableName.TASKS)
        .select("*")
        .contains("owner_ids", [currentUser?.id])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Task[];
    },
  });
}
