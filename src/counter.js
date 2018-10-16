class Counter {
  constructor(redis) {
    this.redis = redis
    /* make sure we don't miss errors */
    this.redis.on("error", (err) => { console.log("Error: " + err) })
  }

  async incr (val) {
    /* default to incrementing by one */
    val = val == undefined ? 1 : val
    /* increment */
		this.redis.incr('default')
  }
  
  async state () {
    return await this.redis.get('default')
  }
}

module.exports = Counter
