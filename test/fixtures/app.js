'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {},
    services: {}
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


