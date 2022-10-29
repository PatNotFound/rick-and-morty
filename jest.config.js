module.exports = {
  automock: false,
  collectCoverage: true,
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
