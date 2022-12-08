const {
  mockNews,
  mockCreateNewBody,
} = require("../../database/mocks/mockNews");
const New = require("../../database/models/New");
const {
  getNews,
  setNewToArchived,
  getArchivedNews,
  deleteNew,
  createNew,
} = require("./newsControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../../database/models/New", () => ({
  ...jest.requireActual("../../database/models/New"),
  populate: jest.fn().mockResolvedValue(mockNews),
  sort: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockResolvedValue({
    ...mockNews[0],
    archived: true,
    archiveDate: Date("2022-01-31T23:00:00.000Z"),
  }),
}));

const next = jest.fn();

describe("given a getNews function", () => {
  describe("When its invoked with a request", () => {
    test("Then it should call the response's methods status with '200' and json with a list of news", async () => {
      const expectedStatusCode = 200;
      const req = {};

      New.find.mockReturnThis();

      await getNews(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ news: mockNews });
    });
  });

  describe("When its invoked and an error ocurs", () => {
    test("Then it should call the next with the error", async () => {
      const req = {};
      const expectedError = new Error();

      New.find.mockImplementation(() => {
        throw new Error();
      });

      await getNews(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("given a getArchived function", () => {
  describe("When its invoked with a request", () => {
    test("Then it should call the response's methods status with '200' and json with a list of news", async () => {
      const expectedStatusCode = 200;
      const req = {};

      New.find.mockReturnThis();

      await getArchivedNews(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ archivedNews: mockNews });
    });
  });

  describe("When its invoked and an error ocurs", () => {
    test("Then it should call the next with the error", async () => {
      const req = {};
      const expectedError = new Error();

      New.find.mockImplementation(() => {
        throw new Error();
      });

      await getArchivedNews(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("given a setNewToArchived function", () => {
  describe("When its invoked with a request with new id param", () => {
    test("Then it should call the response's methods status with '200' and json with a new", async () => {
      const idToEdit = mockNews[0].id;
      const expectedStatusCode = 200;
      const expectedJson = {
        updatedNew: {
          ...mockNews[0],
          archived: true,
          archiveDate: Date("2022-01-31T23:00:00.000Z"),
        },
      };

      const req = { params: { id: idToEdit } };

      await setNewToArchived(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When its invoked an invalid id", () => {
    test("Then it should call the next with an error", async () => {
      const idToEdit = false;
      const req = { params: { id: idToEdit } };

      const expectedError = new Error();

      New.findByIdAndUpdate.mockResolvedValue(null);

      await setNewToArchived(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteNew function", () => {
  describe("When it's invoked with params id: newId", () => {
    test("Then it should call the response's method status with a 200, and json with msg: 'New with id newId has been deleted'", async () => {
      const idToDelete = "newId";
      const expectedJson = {
        msg: `New with id ${idToDelete} has been deleted`,
      };
      const req = {
        params: { id: idToDelete },
      };
      const expectedStatusCode = 200;
      New.findByIdAndDelete = jest.fn().mockResolvedValue(true);

      await deleteNew(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it's invoked with an id that doesn't exist", () => {
    test("Then it should call next with an error", async () => {
      const idTodelete = "non existent id";

      const req = {
        params: { id: idTodelete },
      };

      const expectedError = new Error();

      New.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteNew(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked with no id", () => {
    test("Then it should call next", async () => {
      const req = {};

      await deleteNew(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createNew function", () => {
  describe("When it's called with a request with valid new object", () => {
    test("Then it should call the response's method status with a 201, and json method with object with the created new", async () => {
      const req = {
        body: mockCreateNewBody,
      };
      const mockId = "thisIsAMockId";
      const expectedJson = {
        createdNew: { ...mockCreateNewBody, id: mockId },
      };
      const expectedStatus = 201;

      New.create = jest
        .fn()
        .mockResolvedValue({ ...mockCreateNewBody, id: mockId });
      await createNew(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it's called with a request with invalid new object", () => {
    test("Then it should call next with an error", async () => {
      const req = {};

      const expectedError = new Error();
      New.create = jest.fn().mockRejectedValue(expectedError);
      await createNew(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
