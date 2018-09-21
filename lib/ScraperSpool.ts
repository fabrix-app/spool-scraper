import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Scraper } from './scraper'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class ScraperSpool extends ExtensionSpool {
  public scraper: {[key: string]: any} = {}

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      scraper: {
        get: () => {
          return this.scraper
        },
        set: (newInstances) => {
          throw new Error('scraper can not be set through FabrixApp, check spool-scraper instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  /**
   * Validate Configuration
   */
  async validate () {
    // const requiredSpools = [ 'router' ]
    // const spools = Object.keys(this.app.spools)
    //
    // if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
    //   return Promise.reject(new Error(`spool-scraper requires spools: ${ requiredSpools.join(', ') }!`))
    // }

    if (!this.app.config.get('scraper')) {
      return Promise.reject(new Error('No configuration found at config.scraper!'))
    }

    return Promise.all([
      Validator.validateScraperConfig(this.app.config.get('scraper'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * Configure
   */
  configure() {
    return Scraper.configure(this.app)
  }

  /**
   * create caching stores
   */
  async initialize() {
    return Scraper.init(this.app)
  }

  /**
   * unload caching stores
   */
  async unload() {
    return Scraper.unload(this.app)
  }

  async sanity() {
    //
  }
}
