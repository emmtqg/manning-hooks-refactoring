import { createServer, Model } from "miragejs"

import { sales, subscriptions } from "./mocks";
// options.js in format described for miragejs
import options from '../src/store/options';

// sales/subscriptions.json form as per
// fixture loading for cypress testing.
// Derived from mock/index.js data generation.
import salesTest from '../src/store/sales.json';
import subscriptionsTest from '../src/store/subscriptions.json';

const reduceSeries = (series) => {
  return series.reduce((accumulator, currentValue) => { return accumulator + currentValue.amount;
  }, 0);
};

export function startServer({ environment = "development" } = {}) {
  
  console.log(`starting server in ${environment} mode`);

  let server = createServer({
    environment,
    models: {
      option: Model,
    },

    fixtures: {
      options: options,
      sales: salesTest,
      subscriptions: subscriptionsTest,
    },
  
    routes() {

      this.namespace = "api"

      this.get("/options", (schema) => {
        console.log(`returning /options ${options}`)
        return schema.options.all().models;
      });

      this.get("/summaries", (schema) => {       
        return {
          subscriptionsTotal: reduceSeries(subscriptions),
          salesTotal: reduceSeries(sales),
        }
      })
      
      this.get("/subscriptions", () => {
        return subscriptions;
      });

      this.get("/sales", () => {
        console.log(`hit sales: ${sales}`)
        return sales;
      });

      this.get("/", (schema) => {
        return "";
      });
    },
  })

  return server;
}
