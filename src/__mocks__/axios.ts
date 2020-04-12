export const axios = {
  get: jest.fn(),
  post: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn()
    }
  }
};

export default {
  create: () => axios
};
