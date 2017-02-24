'use strict'

const config = require('config')

const Family = require('../model/family')
const Match = require('../model/match')
const drawManager = require('./draw-manager')

/** Class representing the 'CLOSE' state. */
class CloseState extends Match {
  /**
   * Alias of CloseState.name
   * @returns {string}
   */
  get name () {
    return CloseState.name
  }

  /**
   * Returns an array of valid next states
   * @returns {string[]}
   */
  get validNextStates () {
    return [OpenState.name]
  }

  /**
   * Returns the name of the CloseState class
   * @returns {string}
   */
  static get name () {
    return 'CLOSE'
  }
}

/** Class representing the 'OPEN' state. */
class OpenState extends Family {
  /**
   * Alias of OpenState.name
   * @returns {string}
   */
  get name () {
    return OpenState.name
  }

  /**
   * Returns an array of valid next states
   * @returns {string[]}
   */
  get validNextStates () {
    return [OpenState.name, CloseState.name]
  }

  /**
   * Returns the name of the OpenState class
   * @returns {string}
   */
  static get name () {
    return 'OPEN'
  }

  /**
   * Start the draw
   */
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
