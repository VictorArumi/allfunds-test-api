const { mockNews } = require("../../database/mocks/mockNews");
const New = require("../../database/models/New");
const { getNews } = require("./newsControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../../database/models/New", () => ({
  ...jest.requireActual("../../database/models/New"),
  populate: jest.fn().mockResolvedValue(mockNews),
  sort: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
}));

const next = jest.fn();

describe("given a getNews function", () => {
  describe("When its invoked with a request", () => {
    test("Then it should call the response's methods status with '200' and json with a list of news", async () => {
      const expectedStatusCode = 200;
      const req = {};

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
