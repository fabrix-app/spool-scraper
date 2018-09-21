'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    scrapes: {
      GoogleScrape: require('./GoogleScrape')
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


