export const formatTransactions = (transactions) => {
  const hashMap = new Map()
  const ret = []

  for (let i = 0; i < transactions.length; i++) {
    const currDate = new Date(transactions[i].txnDate)
      .toISOString()
      .slice(0, 10)

    if (hashMap.has(currDate)) {
      hashMap.set(
        currDate,
        hashMap.get(currDate) + parseFloat(transactions[i].eth)
      )
    } else {
      hashMap.set(currDate, parseFloat(transactions[i].eth))
    }
  }

  for (const [key, value] of hashMap) {
    ret.push({ x: key, y: value })
  }

  return ret
}

export const formatTransactionsById = (
  transactions,
  transactionsById,
  hash
) => {
  const hashMap = new Map()
  const ret = []

  for (let i = 0; i < transactions.length; i++) {
    const currTxn = transactionsById.get(transactions[i].id)
    const interactedAddress =
      currTxn.addresses[0].hash === hash
        ? currTxn.addresses[1].hash
        : currTxn.addresses[0].hash

    if (hashMap.has(interactedAddress)) {
      hashMap.set(interactedAddress, hashMap.get(interactedAddress) + 1)
    } else {
      hashMap.set(interactedAddress, 1)
    }
  }

  for (const [key, value] of hashMap) {
    ret.push({ x: key, y: value })
  }

  return ret.sort((a, b) => b.y - a.y).slice(1, 10)
}

export const top10Senders = (transactions) => {
  const hashMap = new Map()
  const ret = []

  for (let i = 0; i < transactions.length; i++) {
    const currAddress = transactions[i].addresses[0].hash

    if (hashMap.has(currAddress)) {
      hashMap.set(currAddress, hashMap.get(currAddress) + 1)
    } else {
      hashMap.set(currAddress, 1)
    }
  }

  for (const [key, value] of hashMap) {
    ret.push({ x: key, y: value })
  }

  return ret.sort((a, b) => b.y - a.y).slice(1, 10)
}

export const top10Receivers = (transactions) => {
  const hashMap = new Map()
  const ret = []

  for (let i = 0; i < transactions.length; i++) {
    const currAddress = transactions[i].addresses[1].hash

    if (hashMap.has(currAddress)) {
      hashMap.set(currAddress, hashMap.get(currAddress) + 1)
    } else {
      hashMap.set(currAddress, 1)
    }
  }

  for (const [key, value] of hashMap) {
    ret.push({ x: key, y: value })
  }

  return ret.sort((a, b) => b.y - a.y).slice(1, 10)
}
