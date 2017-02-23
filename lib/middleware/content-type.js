'use strict'

  /**
   * Validate content-type of the request
   * @param {Object} req - The HTTP request
   */
module.exports = (app) => {
  app.use((req, res, next) => {
    if (/^(post|put|patch|delete)$/i.test(req.method) &&
        !/^application\/json$/i.test(req.headers['content-type'])) {
      res.status(400).send(`Invalid header 'content-type', only 'application/json' is valid`)
    } else {
      next()
    }
  })
}
