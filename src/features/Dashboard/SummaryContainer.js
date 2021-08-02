import React from "react";
import { useQuery } from 'react-query';


const SummaryContainer = () => {

  const url = `${process.env.REACT_APP_BASE_URL}/summaries`;

  const fetchSummaries = async () => {
    return (
      await fetch(
        url
      ).then(async (res) => await res.json())
    )
  }
  const { isLoading, isError, error, data } = useQuery('summaries', fetchSummaries);

  return (
    <>
      {isError && <div>Error raised in the Summaries component: ${error}</div>}

      {isLoading && <div className="loader"></div>}

      {data && Object.keys(data).length &&
      <div className="summary flex flex-row">
        <div className="card bg-indigo">
          <p>CellFast sales</p>
          <p>$ {data.salesTotal}</p>
        </div>
        <div className="card bg-blue">
          <p>CellNow subscriptions</p>
          <p>$ {data.subscriptionsTotal}</p>
        </div>
      </div>
      }
    </>
  );
}

export default SummaryContainer;
