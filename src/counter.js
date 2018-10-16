//const Redis = require('ioredis')
//const redis = new Redis()

var COUNTER = 0

exports.incr = (val) => {
  /* default to incrementing by one */
  val = val == undefined ? 1 : val
  COUNTER += val
}

exports.state = () => {
  return COUNTER
}
