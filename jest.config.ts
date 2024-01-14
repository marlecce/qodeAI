/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    collectCoverage: true,
    coverageDirectory: "./coverage",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageReporters: ["lcov", "text", "html"]
};
