"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Center, Loader, useMantineColorScheme } from "@mantine/core";
import { supabase } from "@/libs/supabase/supabase";
import { redirect, usePathname } from "next/navigation";
import { User } from "@/libs/supabase/entities.types";
import { useGetCurrentUser } from "./use-get-user";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthContextType {
  user?: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthStore {
  isSigningIn: boolean;
  setIsSigningIn: (isSigningIn: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isSigningIn: false,
      setIsSigningIn: (isSigningIn) => set({ isSigningIn }),
    }),
    {
      name: "auth-storage",
    }
  )
);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { isLoading } = useGetUser();
  const { data: user } = useGetCurrentUser();
  const { isSigningIn, setIsSigningIn } = useAuthStore();
  const [isLoadingDelayed, setIsLoadingDelayed] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoadingDelayed(false);
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      setIsSigningIn(false);
    }
  }, [user, setIsSigningIn]);

  const signIn = async () => {
    try {
      setIsSigningIn(true);
      queryClient.invalidateQueries({ queryKey: ["useGetUser"] });
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutSupabase();
      queryClient.invalidateQueries({ queryKey: ["useGetCurrentUser"] });
      queryClient.setQueryData(["useGetCurrentUser"], null);
      window.location.href = "/users/login";
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading: isLoading || isLoadingDelayed || isSigningIn,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const { colorScheme } = useMantineColorScheme();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <Center h="100vh" bg={colorScheme === "dark" ? "dark.7" : "gray.0"}>
        <Loader
          size="xl"
          color={colorScheme === "dark" ? "blue.4" : "blue.6"}
        />
      </Center>
    );
  }

  if (!isAuthenticated && !pathname.includes("/users/login")) {
    redirect("/users/login");
  }

  return children;
}

function useGetUser() {
  return useQuery({
    queryKey: ["useGetUser"],
    queryFn: async () => {
      const user = await getUser();
      return user;
    },
    retryDelay: 0,
  });
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;
}

export async function signOutSupabase() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}
