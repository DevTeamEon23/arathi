const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@context': 'src/context',
    '@icons': 'src/theme/icons',
    '@images': 'src/theme/images',
    '@vendor': 'src/theme/vendor',
    '@store': 'src/store',
    '@services': 'src/services'
  })(config);

  return config;
};