import React, { ReactNode } from 'react';
import {
  AppReducer,
  AppReducerActions,
  AppReducerState,
} from '../stores/AppStore';

export type AppContextType = {
  AppStore: AppReducerState;
  AppDispatch: React.Dispatch<AppReducerActions>;
};

export const AppContext = React.createContext<undefined | AppContextType>(
  undefined
);

function AppProvider({ children }: { children: ReactNode }) {
  const [AppStore, AppDispatch] = React.useReducer(
    AppReducer,
    new AppReducerState()
  );

  React.useEffect(() => {
    const siteMode = localStorage.getItem('site-mode');
    AppDispatch({
      type: 'SwitchMode',
      payload: siteMode ? JSON.parse(siteMode) : 'dark',
    });
  }, []);

  return (
    <AppContext.Provider value={{ AppStore, AppDispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an useAppContext');
  }
  return context;
};

export default AppProvider;
