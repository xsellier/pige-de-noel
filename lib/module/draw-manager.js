'use strict'

module.exports = (family, match) => {
  let lastSender = null
  let matches = {}
  let members = Object.keys(family.listMembers())

  // Initalize available matches
  members.forEach((member) => {
    const spouse = family.getMember(member).spouse

    matches[member] = Object.assign([], members)

    if (spouse != null) {
      matches[member] = matches[member].filter((match) => match !== spouse)
    }
    matches[member] = matches[member].filter((match) => match !== member)
  })

  const computeMatches = () => {
    let orderedMatches = Object.keys(matches).sort((senderAlpha, senderBeta) => {
      return matches[senderAlpha].length - matches[senderBeta].length
    })

    let sender = orderedMatches[0]
    let alternateSender = orderedMatches[1]

    // To prevent match failure, we need to pick a member of a different couple between two draw
    let senderNbAvailableMatches = (matches[sender] || []).length
    let alternateSenderNbAvailableMatches = (matches[alternateSender] || []).length
    let lastSenderSpouse = (family.getMember(lastSender) || {}).spouse

    if (senderNbAvailableMatches > 1 &&
        senderNbAvailableMatches === alternateSenderNbAvailableMatches &&
        lastSenderSpouse === sender) {
      sender = alternateSender
    }

    let nbReceivers = matches[sender].length - 1
    let receiverIndex = Math.floor((Math.random() * nbReceivers))
    let receiver = matches[sender][receiverIndex]

    lastSender = sender

    match.add(sender, receiver)

    // Cannot receive more than one gift
    let receiverToRemove = receiver

    delete matches[sender]

    Object.keys(matches).forEach((sender) => {
      matches[sender] = matches[sender].filter((receiver) => receiverToRemove !== receiver)
    })

    if (Object.keys(matches).length > 0) {
      computeMatches()
    }
  }

  if (Object.keys(matches).length > 0) {
    computeMatches()
  }
}
