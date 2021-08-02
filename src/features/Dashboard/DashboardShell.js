import React, { useState, useContext } from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
import SelectChart from '../../common/components/SelectChart';
// import { DashboardContext } from '../../store/DashboardContext';
import { DashboardContext } from '../../App';

const DashboardShell = ({ fetchDataset }) => {
  const [graphType, setGraphType] = useState(null);
  const context = useContext(DashboardContext);

  const handleSelectionChange = (option) => {
    switch (option.label) {
      case 'Subscriptions':      
        setGraphType(option.value);
        fetchDataset(`${process.env.REACT_APP_BASE_URL}/subscriptions`);
        break;

      case 'Sales':
        setGraphType(option.value); 
        fetchDataset(`${process.env.REACT_APP_BASE_URL}/sales`)
        break;

      default:
        break;
    }
  }

  return (
    <Layout>
      <Aside>
        <h2 data-test-id="aside-title"># Polly dashboard</h2>
        <SelectChart
          data-test-id="select-chart"
          handleSelectionChange={handleSelectionChange}
        />
      </Aside>
      <Main>
        {context?.status === 'error' && 
          <div>Error raised in the useFetch hook: ${context?.error}</div>}

        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>

        {context?.status === 'fetching' && <div className="loader"></div>}

        {context?.status === 'fetched' && 
         context?.data &&
         Object.keys(context?.data).length !== 0 && (
          <>
            <SummaryContainer />
            {(graphType !== null) && <ChartContainer selectedLabel={graphType} />}
          </>
        )}

      </Main>
    </Layout>
  );
}

export default DashboardShell;
