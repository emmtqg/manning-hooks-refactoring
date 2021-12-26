import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './common/components/errors/ComponentErrors';
import useFetch from './common/hooks/useFetch';

import DashboardShell from './features/Dashboard/DashboardShell';
export const DashboardContext = React.createContext();
const { Provider: DashboardProvider } = DashboardContext;

export const initialState = {
  status: 'idle',
  error: '',
  data: []
};

const App = () => {
  const [url, setUrl] = useState("");   
  const fetchDataset = (newUrl) => {
    setUrl(newUrl);
  };

  const value = useFetch(url, initialState);

  return (
    <DashboardProvider value={value}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardShell
          className="container"
          fetchDataset={fetchDataset}
        />        
      </ErrorBoundary>
    </DashboardProvider>
  );
}

export default App;
