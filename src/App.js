import React, { createContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './common/components/errors/ComponentErrors';

import DashboardShell from './features/Dashboard/DashboardShell';

export const DashboardContext = createContext();

const initialState = {
  status: 'idle',
  error: null,
  data: [],
  salesTotal: 0,
  subscriptionsTotal: 0,
};

const App = () => {
  return (
    <DashboardContext.Provider value={initialState}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardShell className="container" />        
      </ErrorBoundary>
    </DashboardContext.Provider>
  );
}

export default App;
