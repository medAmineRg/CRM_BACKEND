import request from "supertest";
import MenuEntity from "../models/MenuEntity.js";
import { server, app } from "../app.js";
import sequelize from "../../config/SequelizeDB.js";
import associations from "../models/index.js";
import logger from "../log/logger.js";

describe("MENU API TEST", () => {
  // Establish connection before all tests
  beforeAll(async () => {
    try {
      // Ensure connection is open
      await sequelize.authenticate();

      // Set up associations
      associations();

      // Sync models, alter existing tables
      await sequelize.sync({ alter: true });
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
        await MenuEntity.truncate({ cascade: true });
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

  describe("GET /menus", () => {
    it("should return all menus", async () => {
      const res = await request(app).get("/menus");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /menus/:id", () => {
    it("should return a menu by id", async () => {
      const menu = await MenuEntity.create({
        name: "Test Menu",
        permissions: [],
      });
      const res = await request(app).get(`/menus/${menu.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", menu.id);
    });

    it("should return 404 if menu not found", async () => {
      const res = await request(app).get("/menus/999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /menus", () => {
    it("should create a new menu", async () => {
      const res = await request(app)
        .post("/menus")
        .send({ name: "New Menu", permissions: [] });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "New Menu");
    });

    it("should return 400 if validation fails", async () => {
      const res = await request(app).post("/menus").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /menus/:id", () => {
    it("should update a menu", async () => {
      const menu = await MenuEntity.create({
        name: "Old Menu",
        permissions: [],
      });
      const res = await request(app)
        .put(`/menus/${menu.id}`)
        .send({ name: "Updated Menu", permissions: [] });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Menu");
    });

    it("should return 404 if menu not found", async () => {
      const res = await request(app)
        .put("/menus/999")
        .send({ name: "Updated Menu", permissions: [] });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /menus/:id", () => {
    it("should delete a menu", async () => {
      const menu = await MenuEntity.create({
        name: "Menu to delete",
        permissions: [],
      });
      const res = await request(app).delete(`/menus/${menu.id}`);
      expect(res.statusCode).toBe(204);
    });

    it("should return 404 if menu not found", async () => {
      const res = await request(app).delete("/menus/999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /menus/:id/permissions", () => {
    it("should return menu permissions", async () => {
      const menu = await MenuEntity.create({
        name: "Test Menu",
        permissions: ["read", "write"],
      });
      const res = await request(app).get(`/menus/${menu.id}/permissions`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("permissions", ["read", "write"]);
    });

    it("should return 404 if menu not found", async () => {
      const res = await request(app).get("/menus/999/permissions");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /menus/:id/permissions", () => {
    it("should update menu permissions", async () => {
      const menu = await MenuEntity.create({
        name: "Test Menu",
        permissions: ["read"],
      });
      const res = await request(app)
        .put(`/menus/${menu.id}/permissions`)
        .send({ permissions: ["read", "write"] });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("permissions", ["read", "write"]);
    });

    it("should return 404 if menu not found", async () => {
      const res = await request(app)
        .put("/menus/999/permissions")
        .send({ permissions: ["read", "write"] });
      expect(res.statusCode).toBe(404);
    });
  });
});
