'use strict'

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
  addMember (member, spouse) {
    if (this.members[member] != null) {
      throw new Error(`Duplicated member ${member}`)
    }

    this.members[member] = { member, spouse }
  }

  /**
   * Add a couple
   * @param {string} member
   * @param {string} spouse
   */
  addCouple (member, spouse) {
    this.addMember(member, spouse)
    this.addMember(spouse, member)
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
   * @param {string} member
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

module.exports = new Family()
