'use strict'

const expect = require('chai').expect
const path = require('path')
const config = require('config')

const MatchModel = require('../../../lib/model/match')
const matchModel = new MatchModel()

describe(`${path.relative(process.cwd(), __filename)} experiment`, () => {
  beforeEach(() => {
    matchModel.reset()
  })

  it('Should be able to add a match', (done) => {
    const sender = 'Julia Roberts'
    const receiver = 'Robert Redford'

    matchModel.add(sender, receiver)

    const supposedReceiver = matchModel.get(sender)

    expect(supposedReceiver).to.be.equal(receiver)

    done()
  })

  it(`Throw an exception if we add a sender or a receiver without name`, (done) => {
    expect(matchModel.add).to.throw(Error)
    expect(matchModel.add.bind(matchModel, null, null)).to.throw(Error)
    expect(matchModel.add.bind(matchModel, 'Robert Redford')).to.throw(Error)
    expect(matchModel.add.bind(matchModel, null, 'Robert Redford')).to.throw(Error)

    done()
  })
})
