import { createServer, Model } from "miragejs"

import { sales, subscriptions } from "./mocks";

const reduceSeries = (series) => {
  return series.reduce((accumulator, currentValue) => { return accumulator + currentValue.amount;
  }, 0);
};

export function startServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      option: Model,
    },

    seeds(server) {
      server.create("option", { value: "Sales" });
      server.create("option", { value: "Subscriptions" });
    },

    routes() {

      this.namespace = "api"

      this.get("/options", (schema) => {
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
        return sales;
      });

      this.get("/", (schema) => {
        return "";
      });
    },
  })

  return server;
}
