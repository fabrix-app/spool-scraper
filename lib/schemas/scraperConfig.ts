import * as joi from 'joi'

export const scraperConfig = joi.object().keys({
  max_connections: joi.number(),
  rate_limit: joi.number(),
  encoding: joi.string().allow('', null),
  jQuery: joi.any(),
}).unknown()
