module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.tsx',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~assets': './assets',
          '~components': './src/components',
          '~constants': './src/constants',
          '~containers': './src/containers',
          '~hoc': './src/hoc',
          '~hooks': './src/hooks',
          '~lib': './src/lib',
          '~routes': './src/routes',
          '~state': './src/state',
          '~utils': './src/utils',
          '~views': './src/views',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
