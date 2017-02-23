'use strict'

const config = require('config')

const Family = require('../model/family')
const Match = require('../model/match')
const drawManager = require('./draw-manager')

class CloseState extends Match {
  get name () {
    return CloseState.name
  }

  get validNextStates () {
    return [OpenState.name]
  }

  static get name () {
    return 'CLOSE'
  }
}

class OpenState extends Family {
  get name () {
    return OpenState.name
  }

  get validNextStates () {
    return [OpenState.name, CloseState.name]
  }

  static get name () {
    return 'OPEN'
  }

  start () {
    let members = this.listMembers()
    let nbMembers = Object.keys(members).length

    if (nbMembers < config.draw.minMembers) {
      throw new Error(`Cannot start a draw, not enough member: ${nbMembers}, min: ${config.draw.minMembers}`)
    }

    drawManager(openState, closeState)

    draw.nextState(closeState)
  }
}

const closeState = new CloseState()
const openState = new OpenState()

let draw = {
  state: openState,
  reset: () => {
    openState.reset()
    closeState.reset()

    draw.nextState(openState)
  },
  nextState: (state) => {
    let isValid = !!draw.state.validNextStates.find((validNextState) => validNextState === state.name)

    if (!isValid) {
      throw new Error(`Invalid next state '${state.name}', valid values are '${draw.state.validNextStates.join('\', \'')}'`)
    }

    draw.state = state
  }
}

module.exports = draw
