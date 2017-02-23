'use strict'

const expect = require('chai').expect
const path = require('path')
const config = require('config')

const familyModel = require('../../../lib/model/family')

describe(`${path.relative(process.cwd(), __filename)} experiment`, () => {
  beforeEach(() => {
    familyModel.reset()
  })

  it('Should be able to add a member', (done) => {
    const member = 'Robert Redford'

    familyModel.addMember(member)

    const addedMember = familyModel.getMember(member)

    expect(addedMember.member).to.be.equal(member)
    expect(addedMember.spouse).to.not.exist

    done()
  })

  it('Should be able to add a couple', (done) => {
    const member = 'Robert Redford'
    const spouse = 'Sibylle Szaggars'

    familyModel.addCouple(member, spouse)

    const addedMember = familyModel.getMember(member)

    expect(addedMember.member).to.be.equal(member)
    expect(addedMember.spouse).to.be.equal(spouse)

    const addedSpouse = familyModel.getMember(spouse)

    expect(addedSpouse.member).to.be.equal(spouse)
    expect(addedSpouse.spouse).to.be.equal(member)

    done()
  })

  it('Remove a member of a couple, remove only the member', (done) => {
    const member = 'Robert Redford'
    const spouse = 'Sibylle Szaggars'

    familyModel.addCouple(member, spouse)
    familyModel.removeMember(member)

    const removedMember = familyModel.getMember(member)

    expect(removedMember).to.not.exist

    const addedSpouse = familyModel.getMember(spouse)

    expect(addedSpouse.member).to.be.equal(spouse)
    expect(addedSpouse.spouse).to.not.exist

    done()
  })

  it(`Throw an exception if we add more than ${config.draw.maxMembers} members`, (done) => {
    const memberPrefix = 'Robert Redford'

    for (let index = 0; index <= config.draw.maxMembers; ++index) {
      familyModel.addMember(`${memberPrefix} ${index}`)
    }

    expect(familyModel.addMember.bind(familyModel, memberPrefix)).to.throw(Error)

    done()
  })

  it(`Throw an exception if we add a member without name`, (done) => {
    expect(familyModel.addMember).to.throw(Error)

    done()
  })
})
