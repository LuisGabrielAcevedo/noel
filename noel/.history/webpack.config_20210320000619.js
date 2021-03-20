module: {
    rules: [
  ... --> other existing rules 
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]!static'
      },
      include: /node_modules/
    }
   ]
  }