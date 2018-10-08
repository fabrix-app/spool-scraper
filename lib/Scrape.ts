import { FabrixApp } from '@fabrix/fabrix'
import { FabrixGeneric } from '@fabrix/fabrix/dist/common'

export class Scrape extends FabrixGeneric {

  public queue(uri: string, options: {[key: string]: any} = {}, preRequest?): Promise<any> {
    return this.app.scraper.addToQueue(
      uri,
      {
      ...options,
        // The global callback won't be called
        callback: (err, res, done) => {
          if (err) {
            return this.reject(err)
          }
          return this.process(res)
            .then(() => this.done(uri, done))
        }
      },
      preRequest
    )
  }

  public direct(uri, options, preRequest): Promise<any> {
    return this.app.scraper.direct(uri, options, preRequest)
      .then(response => {
        return this.process(response)
      })
      .catch(err => {
        return this.reject(err)
      })
  }

  process(res): Promise<any> {
    this.app.log.info(`${this.id} grabbed ${res.body.length} bytes with the default process method`)
    return Promise.resolve(res)
  }

  private reject(err): Promise<any> {
    this.app.log.error(err)
    return Promise.reject(err)
  }

  private done(uri, done): Promise<any> {
    this.app.log.info(`${this.id} ${uri} done`)
    done()
    return Promise.resolve(this.app.scrapper.queue.remove(uri))
  }
}
