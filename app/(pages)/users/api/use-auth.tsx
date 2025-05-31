"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Center, Loader, useMantineColorScheme } from "@mantine/core";
import { supabase } from "@/libs/supabase/supabase";
import { useGetCurrentUser } from "./use-get-user";
import { redirect } from "next/navigation";
import { User } from "@/libs/supabase/entities.types";

interface AuthContextType {
  user?: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useGetCurrentUser();

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log("signOut before");
    try {
      await signOutSupabase();
      console.log("signOut after");
      queryClient.invalidateQueries({ queryKey: ["useGetCurrentUser"] });
      queryClient.setQueryData(["useGetCurrentUser"], null);
      redirect("/users/login");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
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

  if (!isAuthenticated) {
    redirect("/users/login");
  }

  return children;
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
