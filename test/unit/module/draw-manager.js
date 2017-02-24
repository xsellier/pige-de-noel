'use strict'

const expect = require('chai').expect
const path = require('path')
const uuid = require('node-uuid')

const FamilyModel = require('../../../lib/model/family')
const familyModel = new FamilyModel()

const MatchModel = require('../../../lib/model/match')
const matchModel = new MatchModel()

const drawManagerModule = require('../../../lib/module/draw-manager')

function validateDraw(members, couples) {
  let receivers = []

  members = members || []
  couples = couples || []

  couples.forEach((couple) => {
    let member = couple[0]
    let spouse = couple[1]
    let receiver = matchModel.get(member)

    // Not contain self
    expect(receiver).to.not.equal(member)

    // Not contain his/her spouse
    expect(receiver).to.not.equal(spouse)

    // A receiver receives 2 gifts
    expect(receivers).to.not.contain(receiver)
    receivers.push(receiver)

    receiver = matchModel.get(spouse)

    // Not contain self
    expect(receiver).to.not.equal(spouse)

    // Not contain his/her spouse
    expect(receiver).to.not.equal(spouse)

    // A receiver receives 2 gifts
    expect(receivers).to.not.contain(receiver)
    receivers.push(receiver)
  })

  members.forEach((member) => {
    let receiver = matchModel.get(member)

    // Not contain self
    expect(receiver).to.not.equal(member)

    // A receiver receives 2 gifts
    expect(receivers).to.not.contain(receiver)
    receivers.push(receiver)
  })

  expect(receivers.length).to.be.equal(members.length + (couples.length * 2))
}

describe(`${path.relative(process.cwd(), __filename)} experiment`, () => {
  beforeEach(() => {
    familyModel.reset()
    matchModel.reset()
  })

  it('Should be able to perform a draw even with no member', (done) => {
    drawManagerModule(familyModel, matchModel)
    done()
  })

  it('Should not be able to perform a draw with only a couple', (done) => {
    familyModel.addCouple('Julia Roberts', 'Robert Redford')

    expect(() => {
      drawManagerModule(familyModel, matchModel)
    }).to.throw(Error)

    done()
  })

  it('Should be able to perform a valid draw with 2 couples', (done) => {
    const couples = [
      ['Julia Roberts', 'Robert Redford'],
      ['Lara Dabian', 'Céline Dion']
    ]

    couples.forEach((couple) => familyModel.addCouple.apply(familyModel, couple))

    drawManagerModule(familyModel, matchModel)

    validateDraw([], couples)

    done()
  })

  it('Should be able to perform a valid draw with only members', (done) => {
    const members = ['Julia Roberts', 'Robert Redford', 'Lara Dabian', 'Céline Dion']

    members.forEach((member) => familyModel.addMember(member))

    drawManagerModule(familyModel, matchModel)

    validateDraw(members)

    done()
  })

  it('Should be able to perform a valid draw with random users', (done) => {
    const nbMembers = 26
    const nbCouples = 7
    let members = []
    let couples = []

    for (let index = 0; index < nbMembers; ++index) {
      let member = uuid.v4()
      
      members.push(member)
      familyModel.addMember(member)
    }

    for (let index = 0; index < nbCouples; ++index) {
      let member = uuid.v4()
      let spouse = uuid.v4()
      
      couples.push([member, spouse])
      familyModel.addCouple(member, spouse)
    }

    drawManagerModule(familyModel, matchModel)

    validateDraw(members, couples)

    done()
  })
})
