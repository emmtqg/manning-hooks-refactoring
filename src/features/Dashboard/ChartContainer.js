import React, { useContext } from "react";
import LineChart from "./LineChart";
import { DashboardContext } from '../../App';

const ChartContainer = ({ selectedLabel }) => {
  const { data: dataset } = useContext(DashboardContext);

  const returnLength = dataset?.length ?
  'dataset.length' : null;

  let chartLabels = []
  let chartValues = []
  if (returnLength) {
    chartLabels = dataset.map(dataPoint => {
      const localdt = new Date(dataPoint.timestamp);
      return `${localdt.toLocaleDateString()} ${localdt.toLocaleTimeString()}`;
    });

    chartValues = dataset.map(dataPoint => dataPoint.amount);
  }

  return (
    <div>
      {returnLength ?
        <LineChart
          chartLabels={chartLabels}
          chartValues={chartValues}
          label={selectedLabel ? selectedLabel : 'Select a Type of Chart from the Select Dropdown Options.'}
        />
        : <h3>No data values found</h3>
      }
    </div>
  );
};

export default ChartContainer ;
