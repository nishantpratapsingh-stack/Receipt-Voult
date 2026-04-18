import { createContext, useContext, useState, ReactNode } from "react";
import { AuthDialog } from "./AuthDialog";

type Mode = "login" | "signup";

interface AuthContextValue {
  open: (mode?: Mode) => void;
  close: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthDialog = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthDialog must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");

  const open = (m: Mode = "login") => {
    setMode(m);
    setIsOpen(true);
  };

  return (
    <AuthContext.Provider value={{ open, close: () => setIsOpen(false) }}>
      {children}
      <AuthDialog open={isOpen} onOpenChange={setIsOpen} defaultMode={mode} />
    </AuthContext.Provider>
  );
};
