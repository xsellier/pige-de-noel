'use strict'

  /**
   * Validate content-type of the request
   * @param {Object} req - The HTTP request
   */
module.exports = (app) => {
  app.use((err, req, res, next) => {
    console.log(`Error while calling ${req.url}, due to:`, err)

    res.status(500).send({message: 'Something went wrong :-S'})
  })
}
