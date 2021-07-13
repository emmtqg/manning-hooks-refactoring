import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './common/components/errors/ComponentError';
// import DashboardShell from './features/Dashboard/DashboardShell';
import SelectChart from './common/components/SelectChart.js';
import SeriesList from './common/components/SeriesList';

const App = () => {
  const [seriesType, setSeriesType] = useState(null);
  
  const handleSelectionChange = (option) => {
    switch (option.value) {
      case 'Subscriptions':
        // seriesType = 'subscriptions'       
        setSeriesType('subscriptions');
        break;
      case 'Charts':
        // timestamp: '2020-01-02T04:30:41.000Z'
        // amount: integer
        // seriesType = 'sales'
        setSeriesType('sales');
        break;
      default:
        break;
    }
      console.log(`label = ${option.label}`);
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="container">    
        <SelectChart
          handleSelectionChange={handleSelectionChange}
        />
        
        {seriesType !== null && 
          <>
            <hr />
            <SeriesList
              seriesType={seriesType}
            />
          </>
        }
      </section>
    </ErrorBoundary>
  );
  // return <DashboardShell />;
};

export default App;
