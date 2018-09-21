import { FabrixApp } from '@fabrix/fabrix'
import * as Crawler from 'crawler'


export const Scraper = {
  /**
   * Create the Stores
   */

  init: (app: FabrixApp) => {
    const options = app.config.get('scraper') || {}

    const c = new Crawler({
      ...options,
      preRequest: (opts, done) => {
        // 'options' here is not the 'options' you pass to 'c.queue',
        // instead, it's the options that is going to be passed to 'request' module
        console.log(opts)
        // when done is called, the request will start
        done()
      },
      callback: (err, res, done) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(res.statusCode)
        }
      }
    })

    return {
      get crawler() {
        return c
      },
      set crawler(newInstances) {
        throw new Error('scraper.crawler can not be set through FabrixApp, check spool-scraper instead')
      },
      addToQueue: (uri: string, preRequest?) => {
        return Scraper.addToQueue(app, uri, preRequest)
      },
      direct: (uri: string, skipEvent: boolean) => {
        return Scraper.direct(app, uri, skipEvent)
      }
    }
  },

  /**
   * Unload the Stores
   */
  unload: (app: FabrixApp) => {
    return Promise.resolve()
  },

  addToQueue: (app: FabrixApp, uri: string, preRequest?) => {
    app.log.info('app.scraper.addToQueue', uri)
    return app.scraper.crawler.queue({
      uri: uri,
      ...preRequest
    })
  },

  direct: (app: FabrixApp, uri: string, skipEventRequest: boolean = false) => {
    app.log.info('app.scraper.addToQueue', 'CALLING DIRECT', uri)
    return new Promise((resolve, reject) => {
      app.scraper.crawler.direct({
        uri: uri,
        skipEventRequest: skipEventRequest,
        callback: function(err, res) {
          if (err) {
            return reject(err)
          }
          return resolve(res)
        }
      })
    })
  }

}
