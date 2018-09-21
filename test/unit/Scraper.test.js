'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('Scraper', () => {
  it('should exist', () => {
    assert(global.app.scraper)
    assert.equal(typeof global.app.scraper.addToQueue, 'function')
    assert.ok(global.app.scraper.queue)
    assert.equal(typeof global.app.scraper._queueSize, 'function')
    assert.equal(typeof global.app.scraper.direct, 'function')

  })

  it('should queue a page to crawl', (done) => {
    global.app.scraper.addToQueue('https://google.com')
      .then(res => {
        // console.log(res)
        done()
      })
      .catch(err => {
        done(err)
      })

  })

  it('should get the queue size', () => {
    console.log(global.app.scraper.queue)
    assert.ok(global.app.scraper._queueSize)
    assert.equal(global.app.scraper._queueSize(), global.app.scraper.queue.size)
  })

  it('should queue a page to crawl', (done) => {
    global.app.scraper.direct('https://google.com', false)
      .then(res => {
        // console.log(res.statusCode, res)
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})
