module.exports = {
  setupFiles: ['./jest.setup.ts'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)']
}
