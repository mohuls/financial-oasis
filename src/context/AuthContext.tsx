
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import authData from "../data/auth.json";
import { toast } from "@/components/ui/sonner";

interface User {
  name: string;
  email: string;
  password: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("vip-finance-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = authData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("vip-finance-user", JSON.stringify(foundUser));
      toast.success("התחברת בהצלחה", {
        description: `ברוך הבא, ${foundUser.name}`,
      });
      return true;
    } else {
      toast.error("התחברות נכשלה", {
        description: "אימייל או סיסמה שגויים",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("vip-finance-user");
    toast.info("התנתקת מהמערכת", {
      description: "להתראות!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
