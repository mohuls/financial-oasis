
import { createServer, Model, Response } from "miragejs";
import db from "../data/db.json";
import fs from "fs";
import path from "path";

export function makeServer() {
  return createServer({
    models: {
      income: Model,
      expenses: Model,
      advances: Model,
      outstandingCustomers: Model,
    },

    seeds(server) {
      // Seed with data from db.json
      server.db.loadData({
        income: db.income || [],
        expenses: db.expenses || [],
        advances: db.advances || [],
        outstandingCustomers: db.outstandingCustomers || [],
      });
      
      // Store field worker salaries separately as it has a different structure
      server.schema.register("fieldWorkerSalaries", db.fieldWorkerSalaries || {});
    },

    routes() {
      this.namespace = "api";

      // Helper function to write to db.json
      const writeToDb = () => {
        const dbData = {
          income: this.db.income,
          expenses: this.db.expenses,
          advances: this.db.advances,
          outstandingCustomers: this.db.outstandingCustomers,
          fieldWorkerSalaries: this.schema.fieldWorkerSalaries,
        };
        
        // In a real environment, you'd use fs.writeFileSync
        // Here we'll simulate success but console log the data
        console.log("DB data would be written:", dbData);
        
        // In development, we can't write to the file directly
        // This would be implemented in a real backend
        return true;
      };

      // GET requests
      this.get("/income", (schema) => {
        return schema.db.income;
      });

      this.get("/expenses", (schema) => {
        return schema.db.expenses;
      });

      this.get("/advances", (schema) => {
        return schema.db.advances;
      });

      this.get("/outstandingCustomers", (schema) => {
        return schema.db.outstandingCustomers;
      });

      this.get("/fieldWorkerSalaries", (schema) => {
        return schema.fieldWorkerSalaries;
      });

      // POST requests
      this.post("/income", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.income.insert(attrs);
        writeToDb();
        return result;
      });

      this.post("/expenses", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.expenses.insert(attrs);
        writeToDb();
        return result;
      });

      this.post("/advances", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.advances.insert(attrs);
        writeToDb();
        return result;
      });

      this.post("/outstandingCustomers", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.outstandingCustomers.insert(attrs);
        writeToDb();
        return result;
      });

      // PUT requests
      this.put("/income/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.income.update(id, attrs);
        writeToDb();
        return result;
      });

      this.put("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.expenses.update(id, attrs);
        writeToDb();
        return result;
      });

      this.put("/advances/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.advances.update(id, attrs);
        writeToDb();
        return result;
      });

      this.put("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const result = schema.db.outstandingCustomers.update(id, attrs);
        writeToDb();
        return result;
      });

      this.put("/fieldWorkerSalaries", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        schema.fieldWorkerSalaries = data;
        writeToDb();
        return data;
      });

      // DELETE requests
      this.del("/income/:id", (schema, request) => {
        const id = request.params.id;
        schema.db.income.remove(id);
        writeToDb();
        return new Response(204);
      });

      this.del("/expenses/:id", (schema, request) => {
        const id = request.params.id;
        schema.db.expenses.remove(id);
        writeToDb();
        return new Response(204);
      });

      this.del("/advances/:id", (schema, request) => {
        const id = request.params.id;
        schema.db.advances.remove(id);
        writeToDb();
        return new Response(204);
      });

      this.del("/outstandingCustomers/:id", (schema, request) => {
        const id = request.params.id;
        schema.db.outstandingCustomers.remove(id);
        writeToDb();
        return new Response(204);
      });
    },
  });
}
