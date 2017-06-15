/**
 * Module Name: mysql-watcher
 * 
 * mysql-watcher is a tool for subscribing to mysql events such as UPDATE, INSERT, DELETE... for real-time updates
 * 
 * @author Christian Ezeani <christian.ezeani@gmail.com>
 * @copyright 2017 Christian Ezeani
 */


let xDsn = new Map();
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
      // 
    }, dsn);

    xDsn.set(this, info);
    xEvents.set(this, []);
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
    return (callback) => {
      // 
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
}

module.exports = MySQLWatcher;