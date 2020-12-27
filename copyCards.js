const fse = require('fs-extra');

const src = 'node_modules/@bixelpitch/cah-cards/dist/';
const dest = 'public/cards';

fse.emptyDirSync(dest);
fse.copySync(src, dest);
