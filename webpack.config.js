const path = require('path');

module.exports = {
  mode: 'development',
  entry: './euler/js/main.jsx',
  output: {
    path: path.join(__dirname, '/euler/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [[
            "@babel/preset-env",
            {
              "useBuiltIns": "usage",
              "corejs": 3
            }
          ], '@babel/preset-react'],
        },
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
	devtool: "source-map"
};
