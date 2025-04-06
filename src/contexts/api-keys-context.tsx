
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiKeys {
  grokApiKey: string;
  fluvioApiKey: string;
}

interface ApiKeysContextType {
  apiKeys: ApiKeys;
  setApiKey: (keyType: keyof ApiKeys, value: string) => void;
  isConfigured: boolean;
}

const defaultApiKeys: ApiKeys = {
  grokApiKey: '',
  fluvioApiKey: '',
};

const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined);

export const ApiKeysProvider = ({ children }: { children: ReactNode }) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(defaultApiKeys);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  
  useEffect(() => {
    // Load API keys from localStorage on component mount
    const storedGrokKey = localStorage.getItem('grokApiKey') || '';
    const storedFluvioKey = localStorage.getItem('fluvioApiKey') || '';
    
    setApiKeys({
      grokApiKey: storedGrokKey,
      fluvioApiKey: storedFluvioKey
    });
    
    // Set configured flag if both keys exist
    setIsConfigured(!!(storedGrokKey && storedFluvioKey));
  }, []);
  
  const setApiKey = (keyType: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [keyType]: value }));
    localStorage.setItem(keyType, value);
    
    // Check if both keys are now configured
    const updatedKeys = { ...apiKeys, [keyType]: value };
    setIsConfigured(!!(updatedKeys.grokApiKey && updatedKeys.fluvioApiKey));
  };
  
  return (
    <ApiKeysContext.Provider value={{ apiKeys, setApiKey, isConfigured }}>
      {children}
    </ApiKeysContext.Provider>
  );
};

export const useApiKeys = () => {
  const context = useContext(ApiKeysContext);
  if (!context) {
    throw new Error('useApiKeys must be used within an ApiKeysProvider');
  }
  return context;
};
