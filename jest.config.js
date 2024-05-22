module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        '\\.(css|less)$': '<rootDir>/node_modules/tailwindcss',
    },
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
        "<rootDir>/__tests__/*.test.(js|jsx|ts|tsx)",
        "<rootDir>/__tests__/**/*.test.(js|jsx|ts|tsx)",
    ],
    transform: {
        // transform에 presets 꼭 넣어줘야함
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-typescript"] }],
    },
    // transformIgnorePatterns: ["<rootDir>/node_modules/"],
    transformIgnorePatterns: ['/node_modules/(?!.*/)'],
    passWithNoTests: true,
};