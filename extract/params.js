const fs = require('fs').promises;
const rules = require('../rules.json');

const paramsOnly = Object.entries(rules).reduce((result, [key, value]) => {
  result[key] = {params: value['params']};
  return result;
}, {});

fs.writeFile(
    './params.json',
    JSON.stringify(paramsOnly),
    {enconding: 'utf-8'},
).then(() => {
  console.log('[OK]');
}).catch((e) => {
  console.error('[ERROR]', e);
});

