const path = require('path');

const resolvePath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    /* rules */
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules[config.module.rules.length - 2].test =
      /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
    console.log(config.module.rules);

    /* modules */
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules', 'styles'];

    /* alias */
    config.resolve.alias = {
      ...config.resolve.alias,
      // '~/': path.resolve(__dirname, '../src'),
      // 위 코드 적용 안됨

      '~/assets': path.resolve(__dirname, '../src/assets'),
      '~/types': path.resolve(__dirname, '../src/types'),
      '~/components': path.resolve(__dirname, '../src/components'),
      '~/context': path.resolve(__dirname, '../src/context'),
      '~/hooks': path.resolve(__dirname, '../src/hooks'),
      '@emotion/core': resolvePath('node_modules/@emotion/react'),
      '@emotion/styled': resolvePath('node_modules/@emotion/styled'),
      'emotion-theming': resolvePath('node_modules/@emotion/react'),
    };

    return config;
  },
};
