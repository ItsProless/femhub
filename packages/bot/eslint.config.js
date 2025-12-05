import { config } from '@workspace/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
	...config,
	{
		rules: {
			'turbo/no-undeclared-env-vars': 'off',
		},
	},
	{
		ignores: ['dist/**', '__tests__/**'],
	},
];
