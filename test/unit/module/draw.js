'use strict'

const expect = require('chai').expect
const path = require('path')

const drawModule = require('../../../lib/module/draw')

describe(`${path.relative(process.cwd(), __filename)} during OPEN state`, () => {
  beforeEach(() => {
    drawModule.reset()
  })

  it('Should not be able to get a match until the draw', (done) => {
    expect(drawModule.state.getMatch).to.not.exist

    done()
  })

  it('Should be able to add/remove/list/get members/couples in a family and to start a draw', (done) => {
    expect(drawModule.state.addCouple).to.exist
    expect(drawModule.state.addMember).to.exist
    expect(drawModule.state.removeMember).to.exist
    expect(drawModule.state.listMembers).to.exist
    expect(drawModule.state.getMember).to.exist
    expect(drawModule.state.start).to.exist

    done()
  })
})

describe(`${path.relative(process.cwd(), __filename)} during CLOSE state`, () => {
  before(() => {
    const members = ['Robert Redford', 'Dwayne Johnson', 'Natalie Portman', 'Daniel Radcliffe', 'Emma Watson']

    drawModule.reset()
    members.forEach(drawModule.state.addMember)
    drawModule.state.start()
  })

  it('Should be able to get a match if a draw has been started', (done) => {
    expect(drawModule.state.getMatch).to.exist

    done()
  })

  it('Should not be able to add/remove/list/get members/couples in a family and to start a draw', (done) => {
    expect(drawModule.state.addCouple).to.not.exist
    expect(drawModule.state.addMember).to.not.exist
    expect(drawModule.state.removeMember).to.not.exist
    expect(drawModule.state.listMembers).to.not.exist
    expect(drawModule.state.getMember).to.not.exist
    expect(drawModule.state.start).to.not.exist

    done()
  })
})