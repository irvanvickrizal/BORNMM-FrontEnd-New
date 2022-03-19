module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'react/jsx-filename-extension': ['warn', {extensions: ['.js', '.jsx']}],
        'react/jsx-props-no-spreading': ['off'],
        'jsx-a11y/label-has-associated-control': ['error', {assert: 'either'}],
        indent: [2, 4],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-curly-newline': 'off',
        'react/prop-types': 'off',
        'import/no-unresolved': 'off',
        'no-param-reassign': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'no-unused-vars': 'off',
        'import/no-named-as-default-member': 'off',
        'react/destructuring-assignment': 'off',
        // eslint-disable-next-line no-dupe-keys
        'prettier/prettier': 'off',
        'react/no-unknown-property': 'off',
        'no-return-assign': 'off',
        'eqeqeq': 'off',
        'react/self-closing-comp': 'off',
        'spaced-comment': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/order': 'off',
        'vars-on-top': 'off',
        'no-var': 'off',
        'object-shorthand': 'off',
        'jsx-a11y/control-has-associated-label': 'off'
    }
};
