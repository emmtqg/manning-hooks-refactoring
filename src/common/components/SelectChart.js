import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import Select from 'react-select';
// import { useQuery } from 'react-query';
import useFetch from '../hooks/useFetch';
import { DashboardContext } from '../../App';
import { SelectChartError } from './errors/ComponentErrors';

const SelectChart = ({ handleSelectionChange }) => {
  
  const initialState = useContext(DashboardContext);

  const url = `${process.env.REACT_APP_BASE_URL}/options`;

	const { status, error, data } = useFetch(url, initialState);

  const handleError = useErrorHandler(error);
  if (status === 'error') handleError(error);

  const loadOptions = () => {
    if (!data) {
      console.log('no data on loadOptions call');
      return {};
    }

    return data.map(option => ({ label: option.value, value: option.value }));
  }

  return (
    <ErrorBoundary FallbackComponent={SelectChartError}>
      {status === 'error' && <div>Error raised in the useFetch hook: ${error}</div>}
      {status === 'fetching' && <div className="loader"></div>}
      {status === 'fetched' &&
      <Select
        className="select-chart"
        options={loadOptions()}
        onChange={handleSelectionChange}
      />}
    </ErrorBoundary>
  ); 
};

SelectChart.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
}

export default SelectChart;
