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
  describe("When it receives a valid request", () => {
    test("Then it should return status 200 and the database list of news with archived false value, sorted by storage date", async () => {
      await New.create(mockNews[0]);
      await New.create(mockNews[1]);
      await New.create(mockNews[2]);

      const sortedNonArchivedNews = mockNews
        .filter((_new) => !_new.archived)
        .sort((a, b) => new Date(b.storageDate) - new Date(a.storageDate));

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

describe("Given a GET /news/archived enpoint", () => {
  describe("When it receives a valid request", () => {
    test("Then it should return status 200 and the database list of news with archived true value, sorted by storage date", async () => {
      await New.create(mockNews[0]);
      await New.create(mockNews[1]);
      await New.create(mockNews[2]);
      await New.create(mockNews[3]);

      const sortedArchivedNews = mockNews
        .filter((_new) => _new.archived)
        .sort((a, b) => new Date(b.archiveDate) - new Date(a.archiveDate));

      const {
        body: { archivedNews },
      } = await request(app).get("/news/archived").expect(200);

      expect(archivedNews).toHaveLength(sortedArchivedNews.length);
      expect(archivedNews[0].title).toBe(sortedArchivedNews[0].title);
      expect(archivedNews[0].storageDate).toBe(
        sortedArchivedNews[0].storageDate
      );
      expect(archivedNews[0].description).toBe(
        sortedArchivedNews[0].description
      );
    });
  });
});

describe("Given a PUT /news/edit/:id enpoint", () => {
  describe("When it receives a request with an existing new id", () => {
    test("Then it should return status 200 and the same new with archive property value true, and an archiveDate", async () => {
      const { id: idToArchive } = await New.create(mockNews[0]);

      const newSetToArchived = {
        ...mockNews[0],
        archived: true,
        archiveDate: Date.now(),
      };

      const {
        body: { updatedNew },
      } = await request(app).put(`/news/edit/${idToArchive}`).expect(200);

      expect(updatedNew.archived).toBe(true);
      expect(updatedNew.archiveDate).toBeTruthy();
      expect(updatedNew.title).toBe(newSetToArchived.title);
      expect(updatedNew.storageDate).toBe(newSetToArchived.storageDate);
    });
  });

  describe("When it receives a request with an non existent new id", () => {
    test("Then it should return status 404 and the error message:'Error: new id does not exist in DB, impossible to update' ", async () => {
      await New.create(mockNews[0]);
      const idToArchive = "this is a non existent id";
      const expectedMsg =
        "Error: new id does not exist in DB, impossible to update";

      const {
        body: { msg },
      } = await request(app).put(`/news/edit/${idToArchive}`).expect(404);

      expect(msg).toBe(expectedMsg);
    });
  });
});

describe("Given a DELETE /news/archived/:id enpoint", () => {
  describe("When it receives a request with an existing new id", () => {
    test("Then it should return status 200 and json with msg: 'New with id 638c88209697e7ea8b97edd0 has been deleted'", async () => {
      const { id: idToDelete } = await New.create(mockNews[1]);
      const expectedMsg = `New with id ${idToDelete} has been deleted`;

      const {
        body: { msg },
      } = await request(app).delete(`/news/archived/${idToDelete}`).expect(200);

      expect(msg).toBe(expectedMsg);
    });
  });

  describe("When it receives a request with unexistent params id: 'non-existent'", () => {
    test("Then it should return a message 'Couldn't delete: new id does not exist'", async () => {
      const idToDelete = "non-existent";
      const expectedMsg = "Couldn't delete: new id does not exist";
      await New.create(mockNews[1]);

      const {
        body: { msg },
      } = await request(app).delete(`/news/archived/${idToDelete}`).expect(404);

      expect(msg).toBe(expectedMsg);
    });
  });
});
