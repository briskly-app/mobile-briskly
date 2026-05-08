module.exports = {
  preset: "jest-expo",
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/android/",
    "<rootDir>/ios/",
    "<rootDir>/app-example/",
  ],
};
