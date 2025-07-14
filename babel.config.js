module.exports = {
  presets: ['module:@react-native/babel-preset'],
    plugins: [
    // Your other plugins here (e.g., 'react-native-paper/babel', etc)
    'react-native-reanimated/plugin' // ← MUST BE LAST
  ],
};
