const package = require('./package.json');
const fs = require('fs');

const { API_URL } = process.env;

package.dependencies['build'] = package.dependencies['build'].replace(
  '${$API_URL}',
  API_URL
);

fs.writeFileSync('package.json', JSON.stringify(package, null, 4));
