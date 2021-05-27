const request = require("supertest");
const { Genre } = require("../../models/genres");
const {User} = require("../../models/users");
const mongoose = require("mongoose");

let server;
let token;
let name;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
    token  = new User().generateAuthToken()
    name = 'Genre 1'
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

  describe("GET /:id", () => {
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

  describe("POST /", () =>{
    
    const exec = async function () {
     
        return await request(server)
        .post('/api/genres')
        .set({'x-auth-token': token})
        .send({name: name});
   
    }

    it('should return 401  if client is not logged in', async()=>{
        token = ''
        const res = await exec();
    })

    it('should return 400  if genre is not 3 chars long', async()=>{
        name = '1234'
        const res = await exec()

        expect(res.status).toBe(400);
    })

    it('should return save the genre if it is valid', async()=>{
        
        const res = await exec();
        //retreive the genre to check that is save successfully
        const genre = await Genre.find({name: 'Genre 1'});
        expect(res.status).toBe(200);
        expect(genre).not.toBeNull();
    })

    it('should return return the genre if it is valid', async()=>{
        //save a valid genre to DB
        const res = await exec()

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Genre 1');
    })
  })
});
