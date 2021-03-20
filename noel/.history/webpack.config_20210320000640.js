{
    rules: [
    {
      test: /\.(woff|woff2|ttc|eot)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]!static'
      },
      include: /node_modules/
    }
   ]
}