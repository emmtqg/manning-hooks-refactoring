import React from 'react';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="error">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  )
}

export const SelectChartError = (error) => {
  return (
    <div role="alert" className="error">
      <p>Something went wrong <em>SelectChart</em>:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export const SeriesListError = (error) => {
  return (
  <div role="alert" className="error">
      <p>Something went wrong <em>SeriesList</em>:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
