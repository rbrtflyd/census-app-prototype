import { createContext, useContext, ReactNode, useState } from 'react';

type EnrichEnhancePage = {
  id: string;
  title: string;
  component: ReactNode;
  parentId?: string;
};

interface EnrichEnhanceContextType {
  currentPageId: string;
  pageHistory: string[];
  addPage: (page: EnrichEnhancePage) => void;
  navigateToPage: (pageId: string) => void;
  navigateBack: () => void;
  pages: Record<string, EnrichEnhancePage>;
}

const EnrichEnhanceContext = createContext<
  EnrichEnhanceContextType | undefined
>(undefined);

export function EnrichEnhanceProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Record<string, EnrichEnhancePage>>({});
  const [currentPageId, setCurrentPageId] = useState<string>('home');
  const [pageHistory, setPageHistory] = useState<string[]>(['home']);

  const addPage = (page: EnrichEnhancePage) => {
    setPages((prev) => ({
      ...prev,
      [page.id]: page,
    }));
  };

  const navigateToPage = (pageId: string) => {
    setCurrentPageId(pageId);
    setPageHistory((prev) => [...prev, pageId]);
  };

  const navigateBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const previousPageId = newHistory[newHistory.length - 1];
      setCurrentPageId(previousPageId);
      setPageHistory(newHistory);
    }
  };

  return (
    <EnrichEnhanceContext.Provider
      value={{
        currentPageId,
        pageHistory,
        addPage,
        navigateToPage,
        navigateBack,
        pages,
      }}>
      {children}
    </EnrichEnhanceContext.Provider>
  );
}

export const useEnrichEnhance = () => {
  const context = useContext(EnrichEnhanceContext);
  if (!context) {
    throw new Error(
      'useEnrichEnhance must be used within a EnrichEnhanceProvider'
    );
  }
  return context;
};
