class Counter {
  constructor(redis, name) {
    this.redis = redis
    /* assume the key is called "clicks" */
    this.name = name == undefined ? "clicks" : name
    /* make sure we don't miss errors */
    this.redis.on("error", (err) => { console.log("Error: " + err) })
  }

  async incr (key, val) {
    /* default to incrementing by one */
    val = val == undefined ? 1 : val
    /* increment */
		this.redis.incr(key ? key : this.name)
  }
  
  async state (key) {
    let count = await this.redis.get(key ? key : this.name)
    /* keys in redis are set to null by default */
    return count == null ? 0 : count
  }

  async list () {
    let keys = await this.redis.keys('*')
    if (keys.length == 0) { return {} }
    let vals = await this.redis.mget(keys)
    /* combine list of keys and values into an object */
    return keys.reduce((obj, k, i) => ({...obj, [k]: vals[i] }), {})
  }
}

module.exports = Counter
