import React, { useContext } from "react";
import LineChart from "./LineChart";
import { DashboardContext } from '../../store/DashboardContext';

const ChartContainer = ({ selectedLabel }) => {
  const { data: dataset } = useContext(DashboardContext);

  const chartLabels = dataset.map(dataPoint => {
    const localdt = new Date(dataPoint.timestamp);
    return `${localdt.toLocaleDateString()} ${localdt.toLocaleTimeString()}`;
  });
  
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
