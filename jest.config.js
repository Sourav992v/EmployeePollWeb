export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Mock file imports for Jest.
    // For example, importing a .css file will return an empty object.
    "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js",
    // For example, importing a .css file will return an empty object.
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileMock.js",
  },
};