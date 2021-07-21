import React, { useState } from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
import SelectChart from '../../common/components/SelectChart';

const DashboardShell = () => {
  const [graphType, setGraphType] = useState(null);
  // timestamp: '2020-01-02T04:30:41.000Z'
  // amount: integer

  const handleSelectionChange = (option) => {
    switch (option.label) {
      case 'Subscriptions':      
        setGraphType('Subscriptions');
        break;
      case 'Charts':
        setGraphType('Sales');
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (event) => {
    const selectedLabel = event.target.selectedOptions[0].label;
    // this.props.fetchDataset(event.target.value);
    this.setState({ selectedLabel });
  }

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        <SelectChart
          handleSelectionChange={handleSelectionChange}
          />
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        {(graphType !== null) && <ChartContainer selectedLabel={graphType} />}
      </Main>
    </Layout>
  );
}

// const mapDispatchToProps = {
//   fetchDataset
// };

// export default connect(null, mapDispatchToProps)(DashboardShell);
export default DashboardShell;
