
import { createServer, Model, Response } from "miragejs";
import db from "../data/db.json";

export function makeServer() {
  return createServer({
    models: {
      income: Model,
      expense: Model,
      advance: Model,
      outstandingCustomer: Model,
    },

    seeds(server) {
      // Seed with data from db.json
      db.income.forEach(item => server.create("income", item));
      db.expenses.forEach(item => server.create("expense", item));
      db.advances.forEach(item => server.create("advance", item));
      db.outstandingCustomers.forEach(item => server.create("outstandingCustomer", item));
      
      // Store field worker salaries data separately
      server.db.loadData({
        fieldWorkerSalaries: db.fieldWorkerSalaries || {}
      });
    },

    routes() {
      this.namespace = "api";

      // GET requests
      this.get("/income", (schema) => {
        return schema.incomes.all();
      });

      this.get("/expenses", (schema) => {
        return schema.expenses.all();
      });

      this.get("/advances", (schema) => {
        return schema.advances.all();
      });

      this.get("/outstandingCustomers", (schema) => {
        return schema.outstandingCustomers.all();
      });

      this.get("/fieldWorkerSalaries", (schema) => {
        return schema.db.fieldWorkerSalaries;
      });

      // POST requests
      this.post("/income", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.incomes.create(attrs);
      });

      this.post("/expenses", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.expenses.create(attrs);
      });

      this.post("/advances", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.advances.create(attrs);
      });

      this.post("/outstandingCustomers", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.outstandingCustomers.create(attrs);
      });

      // PUT requests
      this.put("/income/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const income = schema.incomes.find(id);
        return income.update(attrs);
      });

      this.put("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const expense = schema.expenses.find(id);
        return expense.update(attrs);
      });

      this.put("/advances/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const advance = schema.advances.find(id);
        return advance.update(attrs);
      });

      this.put("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const customer = schema.outstandingCustomers.find(id);
        return customer.update(attrs);
      });

      this.put("/fieldWorkerSalaries", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        schema.db.fieldWorkerSalaries = data;
        return data;
      });

      // DELETE requests
      this.del("/income/:id", (schema, request) => {
        const id = request.params.id;
        schema.incomes.find(id).destroy();
        return new Response(204);
      });

      this.del("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        schema.expenses.find(id).destroy();
        return new Response(204);
      });

      this.del("/advances/:id", (schema, request) => {
        const id = request.params.id;
        schema.advances.find(id).destroy();
        return new Response(204);
      });

      this.del("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        schema.outstandingCustomers.find(id).destroy();
        return new Response(204);
      });
    },
  });
}
