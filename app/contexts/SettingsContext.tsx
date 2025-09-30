import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface SettingsContextType {
  workspacesEnabled: boolean;
  setWorkspacesEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'census_workspaces_enabled';

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available (client-side only)
  const [workspacesEnabled, setWorkspacesEnabledState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : true;
    }
    return true;
  });

  // Wrapper function to update both state and localStorage
  const setWorkspacesEnabled = (enabled: boolean) => {
    setWorkspacesEnabledState(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
    }
  };

  // Sync with localStorage on mount (hydration safety)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsedValue = JSON.parse(stored);
        if (parsedValue !== workspacesEnabled) {
          setWorkspacesEnabledState(parsedValue);
        }
      }
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        workspacesEnabled,
        setWorkspacesEnabled,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
