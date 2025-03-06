
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
        const newItem = schema.incomes.create(attrs);
        console.log("Created new income:", newItem.attrs);
        return newItem;
      });

      this.post("/expenses", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newItem = schema.expenses.create(attrs);
        console.log("Created new expense:", newItem.attrs);
        return newItem;
      });

      this.post("/advances", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newItem = schema.advances.create(attrs);
        console.log("Created new advance:", newItem.attrs);
        return newItem;
      });

      this.post("/outstandingCustomers", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newItem = schema.outstandingCustomers.create(attrs);
        console.log("Created new outstanding customer:", newItem.attrs);
        return newItem;
      });

      // PUT requests
      this.put("/income/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const income = schema.incomes.find(id);
        console.log(`Updating income ${id} with:`, attrs);
        if (!income) {
          console.error(`Income with ID ${id} not found`);
          return new Response(404, {}, { error: "Not found" });
        }
        return income.update(attrs);
      });

      this.put("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const expense = schema.expenses.find(id);
        console.log(`Updating expense ${id} with:`, attrs);
        if (!expense) {
          console.error(`Expense with ID ${id} not found`);
          return new Response(404, {}, { error: "Not found" });
        }
        return expense.update(attrs);
      });

      this.put("/advances/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const advance = schema.advances.find(id);
        console.log(`Updating advance ${id} with:`, attrs);
        if (!advance) {
          console.error(`Advance with ID ${id} not found`);
          return new Response(404, {}, { error: "Not found" });
        }
        return advance.update(attrs);
      });

      this.put("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const customer = schema.outstandingCustomers.find(id);
        console.log(`Updating customer ${id} with:`, attrs);
        if (!customer) {
          console.error(`Customer with ID ${id} not found`);
          return new Response(404, {}, { error: "Not found" });
        }
        return customer.update(attrs);
      });

      this.put("/fieldWorkerSalaries", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        console.log("Updating field worker salaries:", data);
        schema.db.fieldWorkerSalaries = data;
        return data;
      });

      // DELETE requests
      this.del("/income/:id", (schema, request) => {
        const id = request.params.id;
        console.log(`Deleting income with ID ${id}`);
        try {
          const income = schema.incomes.find(id);
          if (!income) {
            console.error(`Income with ID ${id} not found`);
            return new Response(404, {}, { error: "Not found" });
          }
          income.destroy();
          return new Response(204);
        } catch (error) {
          console.error(`Error deleting income ${id}:`, error);
          return new Response(500, {}, { error: "Server error" });
        }
      });

      this.del("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        console.log(`Deleting expense with ID ${id}`);
        try {
          const expense = schema.expenses.find(id);
          if (!expense) {
            console.error(`Expense with ID ${id} not found`);
            return new Response(404, {}, { error: "Not found" });
          }
          expense.destroy();
          return new Response(204);
        } catch (error) {
          console.error(`Error deleting expense ${id}:`, error);
          return new Response(500, {}, { error: "Server error" });
        }
      });

      this.del("/advances/:id", (schema, request) => {
        const id = request.params.id;
        console.log(`Deleting advance with ID ${id}`);
        try {
          const advance = schema.advances.find(id);
          if (!advance) {
            console.error(`Advance with ID ${id} not found`);
            return new Response(404, {}, { error: "Not found" });
          }
          advance.destroy();
          return new Response(204);
        } catch (error) {
          console.error(`Error deleting advance ${id}:`, error);
          return new Response(500, {}, { error: "Server error" });
        }
      });

      this.del("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        console.log(`Deleting outstanding customer with ID ${id}`);
        try {
          const customer = schema.outstandingCustomers.find(id);
          if (!customer) {
            console.error(`Customer with ID ${id} not found`);
            return new Response(404, {}, { error: "Not found" });
          }
          customer.destroy();
          return new Response(204);
        } catch (error) {
          console.error(`Error deleting customer ${id}:`, error);
          return new Response(500, {}, { error: "Server error" });
        }
      });
    },
  });
}
