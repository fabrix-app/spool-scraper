const Scrape = require('../../dist/Scrape').Scrape

module.exports = class AmazonScrape extends Scrape {
  process(res) {
    const $ = res.$
    const amazon = $('.nav-logo-base').text()
    return Promise.resolve(amazon)
  }
}
