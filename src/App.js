import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './common/components/errors/ComponentErrors';

import DashboardShell from './features/Dashboard/DashboardShell';

import { DashboardProvider } from './store/DashboardContext';

const App = () => {

  return (
    <DashboardProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardShell className="container" />        
      </ErrorBoundary>
    </DashboardProvider>
  );
}

export default App;
