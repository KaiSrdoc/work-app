import { supabase } from "@/app/libs/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
  email: string;
};

export function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["useGetUsers"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("*");
      return data ? data : [];
    },
  });
}
