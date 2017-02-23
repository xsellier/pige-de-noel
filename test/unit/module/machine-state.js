'use strict'

const expect = require('chai').expect
const path = require('path')

const machineStateModule = require('../../../lib/module/machine-state')

describe(`${path.relative(process.cwd(), __filename)} during 'OPEN' state`, () => {
  beforeEach(() => {
    machineStateModule.reset()
  })

  it('Should not be able to get a match until the draw', (done) => {
    expect(machineStateModule.state.getMatch).to.not.exist

    done()
  })

  it('Should throw an exception if there is not enough member', (done) => {
    expect(machineStateModule.state.start).to.throw(Error)

    done()
  })

  it('Should be able to add/remove/list/get members/couples in a family and to start a draw', (done) => {
    expect(machineStateModule.state.addCouple).to.exist
    expect(machineStateModule.state.addMember).to.exist
    expect(machineStateModule.state.removeMember).to.exist
    expect(machineStateModule.state.listMembers).to.exist
    expect(machineStateModule.state.getMember).to.exist
    expect(machineStateModule.state.start).to.exist

    done()
  })
})

describe(`${path.relative(process.cwd(), __filename)} during 'CLOSE' state`, () => {
  before(() => {
    const members = ['Robert Redford', 'Dwayne Johnson', 'Daniel Radcliffe', 'Emma Watson', 'Lara Fabian', "Jean-pierre Papin"]

    machineStateModule.reset()

    // Cannot bind the function, because 'state' attribute is dynamic
    members.forEach((member) => machineStateModule.state.addMember(member))
    machineStateModule.state.addCouple('Natalie Portman', 'Benjamin Millepied')
    machineStateModule.state.start()
  })

  it('Should be able to get a match if a draw has been started', (done) => {
    expect(machineStateModule.state.get).to.exist

    done()
  })

  it('Should not be able to add/remove/list/get members/couples in a family and to start a draw', (done) => {
    expect(machineStateModule.state.addCouple).to.not.exist
    expect(machineStateModule.state.addMember).to.not.exist
    expect(machineStateModule.state.removeMember).to.not.exist
    expect(machineStateModule.state.listMembers).to.not.exist
    expect(machineStateModule.state.getMember).to.not.exist
    expect(machineStateModule.state.start).to.not.exist

    done()
  })
})
