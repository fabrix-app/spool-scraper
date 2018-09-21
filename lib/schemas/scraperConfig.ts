import * as joi from 'joi'

export const scraperConfig = joi.object().keys({
  max_connections: joi.number(),
  rate_limit: joi.number(),
  encoding: joi.string().allow('', null),
  incoming_encoding: joi.string().allow('', null),
  jQuery: joi.any(),
  force_UTF8: joi.boolean(),
  retries: joi.number(),
  retry_timeout: joi.number(),
  pre_request: joi.func(),
  skip_duplicates: joi.boolean(),
  rotate_UA: joi.boolean(),
  // String|Array, If rotateUA is false, but userAgent is an array, crawler will use the first one.
  user_agent: joi.alternatives().try(joi.string(), joi.array()),
  // String If truthy sets the HTTP referer header
  referer: joi.string().allow('', null),
  // Object Raw key-value of http headers
  headers: joi.object().allow(null),
}).unknown()
