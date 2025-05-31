import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { WorkEntry } from "@/libs/supabase/entities.types";

export function useGetWorkEntries() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery<WorkEntry[]>({
    enabled: !!currentUser,
    queryKey: ["useGetWorkEntries"],
    queryFn: async () => {
      const { data } = await supabase
        .from("work_entries")
        .select("*")
        .eq("user_id", currentUser?.id)
        .order("work_date", { ascending: false });
      return data ? data : [];
    },
  });
}
