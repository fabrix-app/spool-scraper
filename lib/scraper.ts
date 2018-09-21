import { FabrixApp } from '@fabrix/fabrix'
import * as Crawler from 'crawler'


export const Scraper = {
  /**
   * Create the Stores
   */
  configure: (app: FabrixApp) => {
    const {
      max_connections,
      rate_limit,
      encoding,
      incoming_encoding,
      jQuery,
      pre_request,
      retries,
      retry_timeout,
      skip_duplicates,
      rotate_UA,
      user_agent,
      referrer,
      headers,
    } = app.config.get('scraper')

    const c = new Crawler({
      maxConnections: max_connections,
      rateLimit: rate_limit,
      encoding: encoding,
      incomingEncoding: incoming_encoding,
      retries: retries,
      retryTimeout: retry_timeout,
      jQuery: jQuery,
      preRequest: pre_request,
      skipDuplicates: skip_duplicates,
      callback: (err, res, done) => Scraper.callback(app, err, res, done)
    })

    return Object.defineProperties(app.spools.scraper.scraper, {
      crawler: {
        get: () => {
          return c
        },
        set: (newInstances) => {
          throw new Error('scraper.crawler can not be set through FabrixApp, check spool-scraper instead')
        }
      },
      addToQueue: {
        value: (uri: string, options?, preRequest?) => {
          return Scraper.addToQueue(app, uri, options, preRequest)
        }
      },
      _queueSize: {
        value: () => {
          return Scraper.queueSize(app)
        },
        enumerable: false,
        writable: false
      },
      queue: {
        value: new Map()
      },
      direct: {
        value: (uri: string, skipEvent: boolean) => {
          return Scraper.direct(app, uri, skipEvent)
        }
      }
    })
  },

  init: (app: FabrixApp) => {
    app.scraper.crawler.on('schedule', (options) => {
      app.scraper.queue.set(options.uri, options)
    })

    app.scraper.crawler.on('drain', (options) => {
      app.log.info('app.scraper queue empty')
      app.scraper.queue.clear()
    })

    return Promise.resolve()
  },
  /**
   * Unload the Stores
   */
  unload: (app: FabrixApp) => {
    return Promise.resolve()
  },

  /**
   * Add Url to queue
   */
  addToQueue: (app: FabrixApp, uri: string, options: {[key: string]: any} = {}, preRequest?) => {
    app.log.info('app.scraper.addToQueue', uri)
    return new Promise((resolve, reject) => {
      try {
        app.scraper.crawler.queue({
          uri: uri,
          ...options,
          ...preRequest
        })
        resolve(uri)
      }
      catch (err) {
        reject(err)
      }
    })
  },

  /**
   * Get the size of the queue
   */
  queueSize: (app: FabrixApp) => {
    return app.scraper.crawler.queueSize
  },

  /**
   * Directly Crawl a url
   */
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
  },

  /**
   *
   */
  callback(app: FabrixApp, err, res, done) {
    if (err) {
      console.log('CB', err)
    }
    else {
      console.log('CB', res.statusCode)
      done()
    }
  }

}
