const request = require("supertest");
const { Genre } = require("../../models/genres");
const mongoose = require("mongoose");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "Genre 1" },
        { name: "Genre 2" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name == "Genre 1")).toBeTruthy;
      expect(res.body.some((g) => g.name == "Genre 2")).toBeTruthy;
    });
  });

  describe("GET /:d", () => {
    it("should return a genre if a valid id is given", async () => {
      const genre = new Genre({ name: "Genre 1" });
      await genre.save();
      let res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: "Genre 1" });
    });

    it("should return 404 code if invalid is is passed", async () => {
      let res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });
});
