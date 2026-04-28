import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
  loginStatus: string;
  isRegistered: boolean;
  username: string;
  setRegistered: (username: string) => void;
  coins: number;
  setCoins: (n: number) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  principal: null,
  login: () => {},
  logout: () => {},
  loginStatus: "idle",
  isRegistered: false,
  username: "",
  setRegistered: () => {},
  coins: 0,
  setCoins: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [coins, setCoins] = useState(1000);

  const principal = identity?.getPrincipal().toText() ?? null;
  const isAuthenticated = !!identity && loginStatus === "success";

  // Reset registration state on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setIsRegistered(false);
      setUsername("");
    }
  }, [isAuthenticated]);

  const setRegistered = useCallback((name: string) => {
    setIsRegistered(true);
    setUsername(name);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        principal,
        login,
        logout: clear,
        loginStatus,
        isRegistered,
        username,
        setRegistered,
        coins,
        setCoins,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
