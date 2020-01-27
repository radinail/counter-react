import React, {
  useState,
  useEffect,
  Children,
  ReactChildren,
  ReactElement
} from "react";
import jwtDecode from "jwt-decode";

export type User = {
  name: string;
  email: string;
};
export const UserContext = React.createContext({
  user: null as User | null,
  setUser: null as any
});

export const User = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded: User = jwtDecode(storedToken);
      setUser(decoded);
      console.log("decoded = ", decoded);
    }
  }, []);
  console.log("userContext in context = ", user);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
