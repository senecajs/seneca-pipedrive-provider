module.exports = {
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  watchPathIgnorePatterns: ["dist\\/"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageProvider: "v8",
  setupFiles: ["./jest.setup.js"], // This file will contain setup code for Jest
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1", // This helps in importing modules with absolute paths
  },
  globals: {
    "process.env.PIPEDRIVE_API_KEY": "a4cad8d995eb742a14b27d8faac6287cdd9e3706", // Replace with your API key or mock value
  },
};
