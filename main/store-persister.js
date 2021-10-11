const path = require('path');
const os = require('os');
const {readFileSync, writeFile} = require('fs');

const STORAGE_FILE = path.resolve(os.homedir(), '.notanota.items.json');

async function writeStore(content) {
  return writeFile(
      STORAGE_FILE,
      JSON.stringify(content),
      () => console.log(readStore()),
  );
}

function readStore() {
  try {
    return JSON.parse(readFileSync(STORAGE_FILE).toString());
  } catch (e) {
    console.error(e);

    return [];
  }
}

module.exports.readStore = readStore;
module.exports.writeStore = writeStore;
