import React, { useContext } from "react";
import LineChart from "./LineChart";
import { DashboardContext } from '../../App';
import useFetch from '../../common/hooks/useFetch';

const ChartContainer = ({ selectedLabel }) => {
  
  const initialState = useContext(DashboardContext);
  const url = `${process.env.REACT_APP_BASE_URL}/${selectedLabel.toLowerCase()}`;

	const { status, error, data: dataset } = useFetch(url, initialState);

  const chartLabels = dataset.map(dataPoint => dataPoint.timestamp);
  const chartValues = dataset.map(dataPoint => dataPoint.amount);

  return (
    <div>
      <LineChart
        chartLabels={chartLabels}
        chartValues={chartValues}
        label={selectedLabel ? selectedLabel : 'Select a Type of Chart from the Select Dropdown Options.'}
      />
    </div>
  );
};

export default ChartContainer ;
