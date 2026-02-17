import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "admin@school.edu",
    role: "admin",
    avatar:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
    phone: "+1 (555) 123-4567",
    address: "123 Education St, Learning City, LC 12345",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "teacher@school.edu",
    role: "teacher",
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "student@school.edu",
    role: "student",
    avatar:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Robert Smith",
    email: "parent@school.edu",
    role: "parent",
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    phone: "+1 (555) 456-7890",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on initial state set
    const savedUser = localStorage.getItem("classroom_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string /*password: string*/) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find((u) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("classroom_user", JSON.stringify(foundUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("classroom_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
