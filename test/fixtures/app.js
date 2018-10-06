'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    scrapes: {
      AmazonScrape: require('./AmazonScrape')
    }
  },
  config: {
    scraper: {

    },
    main: {
      spools: [
        require('../../dist').ScraperSpool
      ]
    }
  }
}


