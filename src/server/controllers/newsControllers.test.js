const { mockNews } = require("../../database/mocks/mockNews");
const New = require("../../database/models/New");
const { getNews, setNewToArchived, getArchived } = require("./newsControllers");

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

      await getArchived(req, res, null);

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

      await getArchived(req, res, next);

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
