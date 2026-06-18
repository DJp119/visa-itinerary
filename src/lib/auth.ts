import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  passport?: {
    country: string;
    number: string;
    expiryDate: string;
    status: string;
  };
  stats: {
    visasChecked: number;
    documentsGenerated: number;
    applicationsTracked: number;
    memberSince: string;
  };
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<User>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('visaitinerary_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('visaitinerary_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('visaitinerary_user');
    }
  }, [user]);

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<User | null> => {
    // In a real implementation, this would call an API
    // For now, we'll mock a successful login for demo@visaitinerary.com / password
    if (email === 'demo@visaitinerary.com' && password === 'password') {
      const mockUser: User = {
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@visaitinerary.com',
        avatar: '/images/avatars/user-1.jpg',
        passport: {
          country: 'USA',
          number: '*****1234',
          expiryDate: '2028-05-15',
          status: 'active'
        },
        stats: {
          visasChecked: 24,
          documentsGenerated: 8,
          applicationsTracked: 3,
          memberSince: 'Jan 2024'
        }
      };

      // Update state
      setUser(mockUser);
      setIsAuthenticated(true);

      return mockUser;
    }

    // Mock error for invalid credentials
    throw new Error('Invalid email or password');
  };

  const logout = async (): Promise<void> => {
    // In a real implementation, this would call an API to invalidate the session
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> => {
    // In a real implementation, this would call an API
    // For now, we'll mock a successful registration
    const mockUser: User = {
      id: `user_${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatar: `/images/avatars/user-${Math.floor(Math.random() * 5) + 1}.jpg`,
      passport: {
        country: 'USA',
        number: '*****1234',
        expiryDate: '2028-05-15',
        status: 'active'
      },
      stats: {
        visasChecked: 0,
        documentsGenerated: 0,
        applicationsTracked: 0,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }
    };

    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);

    return mockUser;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}