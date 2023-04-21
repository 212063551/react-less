module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint"],
	rules: {
		// 重新配置 react-hooks 相关内容
		"react-hooks/rules-of-hooks": "error",
	},
};
