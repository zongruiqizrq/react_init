module.exports = {
  rules: [
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
          }
        },
        "sass-loader"
      ]
    },
    {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader"
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            name: "images/[hash:8].[name].[ext]",
            limit: 8192
          }
        }
      ]
    }
  ]
}
