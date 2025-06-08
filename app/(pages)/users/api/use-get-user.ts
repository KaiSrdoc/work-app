import { useQuery } from "@tanstack/react-query";
import { getUser } from "./use-auth";
import { supabase } from "@/libs/supabase/supabase";
import { TableName, User } from "@/libs/supabase/entities.types";

export function useGetCurrentUser() {
  return useQuery<User>({
    queryKey: ["useGetCurrentUser"],
    queryFn: async () => {
      const user = await getUser();
      const { data } = await supabase
        .from(TableName.USERS)
        .select("*")
        .eq("email", user.email)
        .single();
      return { ...data, avatar: user.user_metadata.avatar_url };
    },
  });
}
