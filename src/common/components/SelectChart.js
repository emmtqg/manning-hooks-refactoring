import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useQuery } from 'react-query';
// import { SelectChartError } from './errors/ComponentErrors';

const SelectChart = ({ handleSelectionChange }) => {

  const url = `${process.env.REACT_APP_BASE_URL}/options`;

  const fetchOptions = async () => {
    return (
      await fetch(
        url,
        { headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }).then(async (res) => await res.json())
    )
  }
  const { isLoading, isError, error, data } = useQuery('options', fetchOptions);

  const loadOptions = (data) => {
    if (!data) {
      console.log('No data on loadOptions call');
      return {};
    }

    return data.map(option => ({ label: option.value, value: option.value }));
  }

  return (
    <>
      {isError && <div>Error raised in the useQuery hook: ${error}</div>}

      {isLoading && <div className="loader"></div>}

      {data && (data.length > 0) &&
      <div data-test-id="select-chart">
        <Select
          className="select-chart"
          classNamePrefix="react-select"
          options={loadOptions(data)}
          onChange={handleSelectionChange}
        />
      </div>}
    </>
  ); 
};

SelectChart.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
}

export default SelectChart;
