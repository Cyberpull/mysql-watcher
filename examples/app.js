const MySQLWatcher = require('../libs/watcher.js');

let watcher = new MySQLWatcher({});

watcher.connect(() => {
  console.info('Connected!');
});