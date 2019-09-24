module.exports = {
	"root": true,
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"react-hooks"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn"
	}
};