import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.mjs', '**/*.d.ts'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: ['tsconfig.json', 'tsconfig.spec.json'],
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
)
