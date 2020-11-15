module.exports = {
  preset: 'react-native',
  setupFiles: ['./__tests__/config/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@codler|@react-native-community|@react-navigation|react-native-button|native-base-.*|react-native-.*)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['Helper', 'config'],
};
