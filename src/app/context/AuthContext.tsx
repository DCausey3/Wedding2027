import { createContext, useContext, useState, ReactNode } from 'react';

export type GuestType = 'colombia-only' | 'florida-only' | 'both' | 'choose-one' | 'bridal-party';

export interface GuestData {
  name: string;
  email: string;
  type: GuestType;
  rsvpComplete: boolean;
  plusOne: boolean;
  party: string[];
}

interface AuthContextValue {
  guest: GuestData | null;
  setGuest: (guest: GuestData | null) => void;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  guest: null,
  setGuest: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ guest, setGuest, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
