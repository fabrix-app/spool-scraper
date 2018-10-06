'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('# Amazon Scrape', () => {
  it('should exist', () => {
    assert(global.app.scraper)
    assert.ok(global.app.scrapes['AmazonScrape'])
  })
  it('should queue a scrape', (done) => {
    global.app.scrapes['AmazonScrape'].direct('https://amazon.com')
      .then(res => {
        assert.equal(res, 'Amazon')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
