class Counter {
  constructor(redis, name) {
    this.redis = redis
    /* assume the key is called "clicks" */
    this.name = name == undefined ? "clicks" : name
    /* make sure we don't miss errors */
    this.redis.on("error", (err) => { console.log("Error: " + err) })
  }

  async incr (val) {
    /* default to incrementing by one */
    val = val == undefined ? 1 : val
    /* increment */
		this.redis.incr(this.name)
  }
  
  async state () {
    let count = await this.redis.get(this.name)
    /* keys in redis are set to null by default */
    return count == null ? 0 : count
  }
}

module.exports = Counter
