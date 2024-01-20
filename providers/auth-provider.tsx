import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../lib/definations";

const AuthContext = React.createContext<{
  signIn: (userData: any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(
  props: React.PropsWithChildren
): React.ReactElement {
  const [[isLoading, session], setSession] = useStorageState("session");

  async function signIn(userData: any) {
    // Perform sign-in logic here
    setSession(userData);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
