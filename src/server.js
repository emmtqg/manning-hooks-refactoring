import { createServer, Model } from "miragejs"

import { sales, subscriptions } from "./mocks";

export function makeServer({ environment = "test" } = {}) {
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

      this.get("/subscriptions", () => {
        return subscriptions;
      });

      this.get("/sales", () => {
        return sales;
      });
    },
  })

  return server;
}
