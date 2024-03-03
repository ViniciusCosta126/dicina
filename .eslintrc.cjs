module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: {
		es6: true,
	},
	rules: {
		indent: ['error', 'tab'],
		'operator-linebreak': 'off',
		'comma-dangle': 'off',
		'no-trailing-spaces': 'off',
		'max-len': 'off',
		'eol-last': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/first': 'off',
	},
};
