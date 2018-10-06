# spool-scraper

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

:package: Scraper Spool

A Spool to make Scraping the web super easy by implementing [Crawler](https://www.npmjs.com/package/crawler).

## Install
```sh
$ npm install --save @fabrix/spool-scraper
```

## Configure

```js
// config/main.ts
import { ScraperSpool } from '@fabrix/spool-scraper'
export const main = {
  spools: [
    // ... other spools
    ScraperSpool
  ]
}
```

## Configuration

```
// config/scraper.ts
export const scraper = {
  max_connections: 10,
    rate_limit: 1000,
    encoding: null,
    jQuery: true,
    force_UTF8: true,
    retries: 3,
    retry_timeout: 10000,
    incoming_encoding: null,
    skip_duplicates: false,
    // Boolean If true, userAgent should be an array and rotate it (Default false)
    rotate_UA: false,
    // String|Array, If rotateUA is false, but userAgent is an array, crawler will use the first one.
    user_agent: [],
    // String If truthy sets the HTTP referer header
    referer: null,
    // Object Raw key-value of http headers
    headers: null,
    pre_request: (opts, done) => {
      // 'options' here is not the 'options' you pass to 'c.queue',
      // instead, it's the options that is going to be passed to 'request' module
      console.log(opts)
      // when done is called, the request will start
      done()
    }
}
```

For more information about store (type and configuration) please see the scraper documentation.

## Usage
For the best results, create a Scrape Class and override the default process method. 
```ts
  import { Scrape } from '@fabrix/spool-scrapper'
  
  export class AmazonScrape extends Scrape {
    process(res): Promise<any> {
      const $ = res.$
      const amazon = $('.nav-logo-base').text()
      return Promise.resolve(amazon)
    }
  }
```

Then you can either queue your scrape or scrape directly 
```js
// Return a result immediately <see config for options>
const direct = this.app.scrapes.AmazonScrape.direct('https://amazon.com', options, preRequest)

// Add this to the queue <see config for options>
this.app.scrapes.AmazonScrape.queue('https://amazon.com', options, preRequest)
```

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-scraper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-scraper
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-scraper/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-scraper/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-scraper.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-scraper
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-scraper.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-scraper/coverage

