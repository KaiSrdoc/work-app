import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";
import { TableName, Work } from "@/libs/supabase/entities.types";

export function useGetWork() {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery<Work[]>({
    enabled: !!currentUser,
    queryKey: ["useGetWork"],
    queryFn: async () => {
      const { data } = await supabase
        .from(TableName.WORK)
        .select("*")
        .eq("user_id", currentUser?.id)
        .order("work_date", { ascending: false });
      return data ? data : [];
    },
  });
}
