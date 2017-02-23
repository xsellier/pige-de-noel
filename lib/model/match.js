'use strict'

/** Class contain matches for each family member */
class Match {
  /**
   * @constructor
   */
  constructor () {
    this.matches = {}
  }

  /**
   * Add a match between 2 family members
   * @param {string} member
   */
  add (from, to) {
    if (from == null) {
      throw new Error('Cannot add a match if the sender has no name')
    }

    if (to == null) {
      throw new Error('Cannot add a match if the receiver has no name')
    }

    this.matches[from] = to
  }

  /**
   * Return the match between 2 family members
   * @param {string} member
   * @returns {string} member
   */
  get (member) {
    return this.matches[member]
  }

  /**
   * Clear matches
   */
  reset () {
    this.members = {}
  }
}

module.exports = Match
