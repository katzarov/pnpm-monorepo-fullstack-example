// https://docs.nestjs.com/faq/serverless#example-integration
// module.exports = function (options) {
//   return {
//     ...options,
//     // includes node_modules
//     externals: [],
//     output: {
//       ...options.output,
//       libraryTarget: 'commonjs2',
//     },
//     // ... the rest of the configuration
//   };
// }


module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    // includes node_modules
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};


// https://dev.to/slsbytheodo/nestjs-on-aws-lambda-the-ultimate-cdk-deployment-strategy-for-monolithic-apis-380j
// module.exports = function (options, webpack) {
//   return {
//     ...options,
//     entry: ['./src/lambda.ts'],
//     externals: [],
//     output: {
//       ...options.output,
//       libraryTarget: 'commonjs2',
//     },
//     plugins: [
//       ...options.plugins,
//       new webpack.IgnorePlugin({
//         checkResource(resource) {
//           // Ignoring non-essential modules for Lambda deployment
//           return lazyImports.includes(resource);
//         },
//       }),
//     ],
//   };
// };
