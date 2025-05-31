import { User } from "@/libs/supabase/entities.types";
import { supabase } from "@/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["useGetUsers"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("*");
      return data ? data : [];
    },
  });
}
