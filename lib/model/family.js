'use strict'

const config = require('config')

/** Class representing a family. */
class Family {
  /**
   * @constructor
   */
  constructor () {
    this.members = {}
  }

  /**
   * Add a family member
   * @param {string} member
   * @param {string} [spouse]
   */
  _addMember (member, spouse) {
    if (member == null) {
      throw new Error('Cannot add a member without name')
    }

    if (this.members[member] != null) {
      throw new Error(`Duplicated member ${member}`)
    }

    if (Object.keys(this.members).length > config.draw.maxMembers) {
      throw new Error(`Cannot add a new member, too many members in this family`)
    }

    this.members[member] = { member, spouse }
  }

  /**
   * Add a family member
   * @param {string} member
   */
  addMember (member) {
    this._addMember(member)
  }

  /**
   * Add a couple
   * @param {string} member
   * @param {string} spouse
   */
  addCouple (member, spouse) {
    this._addMember(member, spouse)
    this._addMember(spouse, member)
  }

  /**
   * Get a member
   * @param {string} member
   * @returns {object}
   */
  getMember (member) {
    return this.members[member]
  }

  /**
   * List the family members
   * @returns {array<string>}
   */
  listMembers () {
    return this.members
  }

  /**
   * Remove a member
   * @param {string} member
   */
  removeMember (member) {
    let spouse = (this.members[member] || {}).spouse

    if (spouse != null) {
      this.members[spouse].spouse = null
    }

    delete this.members[member]
  }

  /**
   * Clear family
   */
  reset () {
    this.members = {}
  }
}

module.exports = Family
