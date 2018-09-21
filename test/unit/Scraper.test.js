'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('Scraper', () => {
  it('should exist', () => {
    assert(global.app.scraper)
    assert.equal(typeof global.app.scraper.addToQueue, 'function')
    assert.equal(typeof global.app.scraper.queueSize, 'function')
    assert.equal(typeof global.app.scraper.direct, 'function')

  })

  it('should queue a page to crawl', (done) => {
    global.app.scraper.addToQueue('https://google.com')
      .then(res => {
        console.log(res)
        done()
      })
      .catch(err => {
        done(err)
      })

  })

  it('should get the queue size', () => {
    assert.ok(global.app.scraper.queueSize)
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
