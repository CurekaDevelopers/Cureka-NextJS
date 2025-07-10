// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
  },
  plugins: ["react", "react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "prefer-const": "error",
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "no-console": ["warn", { allow: ["error"] }],
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-nested-ternary": "off",
    "consistent-return": "off",
    "react-hooks/exhaustive-deps": "error",
    "no-use-before-define": ["error", { variables: false }],
    "react/react-in-jsx-scope": "off",
  },
};
