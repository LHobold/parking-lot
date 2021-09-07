module.exports = [
  {
    name: 'mobile',
    entry: {
      vendor: 'vendor.js',
      main: ['webpack-hot-middleware/client?name=mobile', 'mobile.js'],
    },
  },
  {
    name: 'desktop',
    entry: {
      vendor: 'vendor.js',
      main: ['webpack-hot-middleware/client?name=desktop', 'desktop.js'],
    },
  },
];
