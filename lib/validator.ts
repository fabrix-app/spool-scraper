/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
import { scraperConfig } from './schemas'

export const Validator = {

  // Validate Scraper Config
  validateScraperConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, scraperConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.scraper: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
