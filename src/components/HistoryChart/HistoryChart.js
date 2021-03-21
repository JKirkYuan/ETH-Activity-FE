import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTransactionsStore } from 'store/transactionsStore'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
}))

const formatTransactionData = (transactions) => {
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

export const TransactionHistoryChart = () => {
  const transactions = useTransactionsStore((state) => state.transactions)
  const classes = useStyles()
  if (!transactions || transactions.length === 0) return <div>Loading...</div>

  return (
    <div className={classes.container}>
      <h2>Transaction numbers by Address</h2>
      <VictoryChart theme={VictoryTheme.material} width={1500}>
        <VictoryLine
          style={{
            data: { stroke: '#92bfb1' },
            parent: { border: '1px solid #ccc' },
          }}
          data={formatTransactionData(transactions)}
        />
      </VictoryChart>
    </div>
  )
}
