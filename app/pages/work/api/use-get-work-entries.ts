import { supabase } from "@/app/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../users/api/use-get-user";

type WorkEntry = {
  id: string;
  date: string;
  hours_worked: number;
  money_earned: number;
  goal_id: string;
  user_id: string;
};

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
        .order("date", { ascending: false });
      return data ? data : [];
    },
  });
}
