const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
const connectDB = require("../../database");
const app = require("..");
const New = require("../../database/models/New");
const { mockNews } = require("../../database/mocks/mockNews");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await New.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a GET /news enpoint", () => {
  describe("When it receives a request", () => {
    test("Then oit should return the database list of news with archived false value, sorted by storage date", async () => {
      await New.create(mockNews[0]);
      await New.create(mockNews[1]);
      await New.create(mockNews[2]);

      const sortedNonArchivedNews = mockNews
        .sort((a, b) => new Date(b.storageDate) - new Date(a.storageDate))
        .filter((_new) => !_new.archived);

      const {
        body: { news },
      } = await request(app).get("/news").expect(200);

      expect(news).toHaveLength(sortedNonArchivedNews.length);
      expect(news[0].title).toBe(sortedNonArchivedNews[0].title);
      expect(news[0].storageDate).toBe(sortedNonArchivedNews[0].storageDate);
      expect(news[1].description).toBe(sortedNonArchivedNews[1].description);
      expect(news[1].storageDate).toBe(sortedNonArchivedNews[1].storageDate);
    });
  });
});
