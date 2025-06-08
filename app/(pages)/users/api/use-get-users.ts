import { TableName, User } from "@/libs/supabase/entities.types";
import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["useGetUsers"],
    queryFn: async () => {
      const { data } = await supabase.from(TableName.USERS).select("*");
      return data ? data : [];
    },
  });
}
