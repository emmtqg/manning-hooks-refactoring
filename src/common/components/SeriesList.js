import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { SeriesListError } from './errors/ComponentErrors'
import useFetch from '../hooks/useFetch';

const SeriesList = ({ seriesType }) => {

  const generateSeriesLi = (loadedSeries) => {
    if (!loadedSeries) return;
    return (loadedSeries.map(ele => {
      return <li key={ele.id}>{ele.timestamp}: {ele.amount}</li>;
    }));
  }

  const { status, error, data } = useFetch(`${process.env.REACT_APP_BASE_URL}/${seriesType}`, `serial-${seriesType}`);

  return (
    <ErrorBoundary FallbackComponent={SeriesListError}>
      {status === 'error' && <div className="error">Error in SeriesList Component: ${error}</div>}
      {status === 'fetching' && <div className="loader"></div>}
      {status === 'fetched' && <ul>{generateSeriesLi(data)}</ul>}      
    </ErrorBoundary>
  )
}

SeriesList.propTypes = {
  seriesType: PropTypes.string.isRequired,
}

export default SeriesList;
