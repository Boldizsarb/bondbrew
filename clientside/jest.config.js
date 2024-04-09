module.exports = {
    // ...other Jest configuration
    transformIgnorePatterns: [
      'node_modules/(?!axios)' // Transform axios, but ignore other node_modules 
    ],
  };
  