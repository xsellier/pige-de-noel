'use strict'

const family = require('../model/family')

class CloseState {
  static get name () {
    return 'CLOSE'
  }

  static get validNextStates () {
    return [OpenState.name]
  }

  static getMatch (member) {
    throw new Error('Not implemented yet !')
  }
}

class OpenState {
  static get name () {
    return 'OPEN'
  }

  static get validNextStates () {
    return [OpenState.name, CloseState.name]
  }

  static start () {
    draw.nextState(CloseState)
  }

  static addMember () {
    family.addMember.apply(family, arguments)
  }

  static addCouple () {
    family.addCouple.apply(family, arguments)
  }

  static getMember () {
    family.getMember.apply(family, arguments)
  }

  static listMembers () {
    family.listMembers.apply(family, arguments)
  }

  static removeMember () {
    family.removeMember.apply(family, arguments)
  }
}

let draw = {
  state: OpenState,
  reset: () => {
    family.reset()

    draw.nextState(OpenState)
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
