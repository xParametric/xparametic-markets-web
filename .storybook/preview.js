import '../src/styles/theme/index.scss';

// eslint-disable-next-line import/prefer-default-export
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
