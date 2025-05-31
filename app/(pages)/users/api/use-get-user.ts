import { useQuery } from "@tanstack/react-query";
import { getUser } from "./auth";
import { supabase } from "@/libs/supabase/supabase";
import { User } from "@/libs/supabase/entities.types";

export function useGetCurrentUser() {
  return useQuery<User & { avatar: string }>({
    queryKey: ["useGetCurrentUser"],
    queryFn: async () => {
      const user = await getUser();
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();
      return { ...data, avatar: user.user_metadata.avatar_url };
    },
  });
}
