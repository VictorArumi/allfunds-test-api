const { notFoundError, generalError } = require("./errors");

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

describe("Given a notFoundError function", () => {
  describe("When its called with a reponse", () => {
    test("Then it should call response's methods status with 404 and json with an object with property errorMessage with value 'Endpoint not found'", () => {
      const expectedStatusCode = 404;
      const messageText = "Endpoint not found";

      const expectedJson = { msg: messageText };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When its called with an error and a response", () => {
    test("Then it should call res status method with a 500 and json method with an object with msg property with 'General error' value", () => {
      const expectedStatusCode = 500;
      const messageText = "General error";
      const expectedJson = { msg: messageText };
      const error = new Error();

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
});
