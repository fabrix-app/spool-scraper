/**
 * Scraper Config
 * see link {http://phantomjs.org/api/webpage/property/viewport-size.html}
 */
export const scraper = {
  max_connections: 10,
  rate_limit: 1000,
  encoding: null,
  jQuery: true,
  pre_request: (opts, done) => {
    // 'options' here is not the 'options' you pass to 'c.queue',
    // instead, it's the options that is going to be passed to 'request' module
    console.log(opts)
    // when done is called, the request will start
    done()
  }
}
