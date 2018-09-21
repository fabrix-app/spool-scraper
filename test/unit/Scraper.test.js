'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('Scraper', () => {
  it('should exist', () => {
    assert(global.app.scraper)
    console.log('BROKE', global.app.scraper)
  })
  it('should queue a page to crawl', (done) => {
    console.log(global.app.scraper.addToQueue('https://google.com'))
    done()
  })

  it('should queue a page to crawl', (done) => {
    global.app.scraper.direct('https://google.com', false)
      .then(res => {
        console.log(res.statusCode, res)
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})
