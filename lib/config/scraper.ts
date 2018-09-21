/**
 * Scraper Config
 * see link {http://phantomjs.org/api/webpage/property/viewport-size.html}
 */
export const scraper = {
  max_connections: 10,
  rate_limit: 1000,
  encoding: null,
  jQuery: true,
  force_UTF8: true,
  retries: 3,
  retry_timeout: 10000,
  incoming_encoding: null,
  skip_duplicates: false,
  // Boolean If true, userAgent should be an array and rotate it (Default false)
  rotate_UA: false,
  // String|Array, If rotateUA is false, but userAgent is an array, crawler will use the first one.
  user_agent: [],
  // String If truthy sets the HTTP referer header
  referer: null,
  // Object Raw key-value of http headers
  headers: null,
  pre_request: (opts, done) => {
    // 'options' here is not the 'options' you pass to 'c.queue',
    // instead, it's the options that is going to be passed to 'request' module
    console.log(opts)
    // when done is called, the request will start
    done()
  }
}
