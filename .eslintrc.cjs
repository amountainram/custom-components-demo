module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "@mia-platform/eslint-config-mia",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  ignorePatterns: [
    ".eslintrc.cjs",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '_' }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '_' }],
  }
}
