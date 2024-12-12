import request from "supertest";
import RoleEntity from "../models/RoleEntity.js";
import { app, server } from "../app.js";
import sequelize from "../../config/SequelizeDB.js";
import associations from "../models/index.js";
import logger from "../log/logger.js";

describe("ROLE API TEST", () => {
  // Establish connection before all tests
  beforeAll(async () => {
    try {
      // Ensure connection is open
      await sequelize.authenticate();

      // Set up associations
      associations();

      // Sync models, alter existing tables
      await sequelize.sync({ force: true });
    } catch (error) {
      logger.error("Setup error:", error);
      throw error;
    }
  });

  // Clean up database before each test
  beforeEach(async () => {
    try {
      // Ensure connection is still open before truncating
      if (sequelize.connectionManager.pool) {
        await RoleEntity.truncate({ cascade: true });
      }
    } catch (error) {
      logger.error("Truncate error:", error);
    }
  });

  // Properly close connections after all tests
  afterAll(async () => {
    try {
      // Close Sequelize connection
      await sequelize.close();

      // Close server
      server.close();
    } catch (error) {
      logger.error("Cleanup error:", error);
    }
  });

  describe("GET /role", () => {
    it("should return all roles", async () => {
      const res = await request(app).get("/roles");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /roles", () => {
    it("should return all roles", async () => {
      const res = await request(app).get("/roles");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /roles/:id", () => {
    it("should return a role by id", async () => {
      const role = await RoleEntity.create({ name: "Test Role" });
      const res = await request(app).get(`/roles/${role.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", role.id);
    });

    it("should return 404 if role not found", async () => {
      const res = await request(app).get("/roles/999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /roles", () => {
    it("should create a new role", async () => {
      const res = await request(app).post("/roles").send({ name: "New Role" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "New Role");
    });

    it("should return 400 if validation fails", async () => {
      const res = await request(app).post("/roles").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /roles/:id", () => {
    it("should update a role", async () => {
      const role = await RoleEntity.create({ name: "Old Role" });
      const res = await request(app)
        .put(`/roles/${role.id}`)
        .send({ name: "Updated Role" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Role");
    });

    it("should return 404 if role not found", async () => {
      const res = await request(app)
        .put("/roles/999")
        .send({ name: "Updated Role" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /roles/:id", () => {
    it("should delete a role", async () => {
      const role = await RoleEntity.create({ name: "Role to delete" });
      const res = await request(app).delete(`/roles/${role.id}`);
      expect(res.statusCode).toBe(204);
    });

    it("should return 404 if role not found", async () => {
      const res = await request(app).delete("/roles/999");
      expect(res.statusCode).toBe(404);
    });
  });
});
