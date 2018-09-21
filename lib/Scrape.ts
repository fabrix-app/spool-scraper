import { FabrixApp } from '@fabrix/fabrix'
import { FabrixGeneric } from '@fabrix/fabrix/dist/common'

export class Scrape extends FabrixGeneric {
  constructor(app: FabrixApp) {
    super(app)
  }

  process(response, done) {
    //
    return this.done(response.options, done)
  }

  private done(options, done) {
    done()
    return this.app.scrapper.queue.remove(options.uri)
  }
}
