import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, Task } from "@/libs/supabase/entities.types";

export function useGetTasks() {
  return useQuery({
    queryKey: ["useGetTasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TableName.TASKS)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Task[];
    },
  });
}
