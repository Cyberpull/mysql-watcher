/**
 * Module Name: mysql-watcher
 * 
 * mysql-watcher is a tool for subscribing to mysql events such as UPDATE, INSERT, DELETE... for real-time updates
 * 
 * @author Christian Ezeani <christian.ezeani@gmail.com>
 * @copyright 2017 Christian Ezeani
 */

const net = require('net');

function caller(callback) {
  let args = Array.prototype.slice.call(this);
  if(typeof(callback) == 'function') { return callback.apply(this, args); }
  return null;
}

let xDsn = new Map();
let xSocket = new Map();
let xEvents = new Map();

/**
 * @class MySQLWatcher
 */
class MySQLWatcher {
  /**
   * Creates an instance of MySQLWatcher.
   * @param {object} dsn - MySQL Connecion Info
   * 
   * @memberOf MySQLWatcher
   */
  constructor(dsn) {
    if (typeof (dsn) != 'object') throw 'Invalid MySQL connection info supplied!';

    let info = Object.assign({
      host: '127.0.0.1',
      port: 3306,
      user: '',
      password: '',
      socketPath: '',
      database: '',
      ssl: null
    }, dsn);

    xDsn.set(this, info);
    xEvents.set(this, []);

    let client = new net.Socket();
    xSocket.set(this, client);
  }

  /**
   * MySQL Connection Info
   * 
   * @readonly
   * 
   * @memberOf MySQLWatcher
   */
  get dsn() { return xDsn.get(this); }

  /**
   * MySQL Events
   * 
   * @readonly
   * 
   * @memberOf MySQLWatcher
   */
  get events() { return xEvents.get(this); }

  /**
   * Connects to MySQL Database
   * @param {function} callback - Callback Function
   * 
   * @readonly
   * 
   * @memberOf MySQLWatcher
   */
  get connect() {
    let dsn = this.dsn;
    let client = xSocket.get(this);
    return (callback) => {
      // Establish socket connection
      client.connect(dsn.port, dsn.host, () => {
        caller.call(this, callback);
      });
      // Receive Data from the server
      client.on('data', (data) => {
        let string = data.toString('utf8');
        console.info(string);
      });
      // Close event handler
      client.on('close', () => {
        console.info('Connection Closed!');
      });
    };
  }

  /**
   * Disconnects from MySQL Database
   * 
   * @readonly
   * 
   * @memberOf MySQLWatcher
   */
  get disconnect() {
    return () => {
      // 
    }
  }

  /**
   * Alias for disconnect
   * 
   * @readonly
   * 
   * @memberOf MySQLWatcher
   */
  get end() { return this.disconnect; }
}

module.exports = MySQLWatcher;