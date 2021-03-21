import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTransactionsStore } from 'store/transactionsStore'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
}))

const top10Senders = (transactions) => {
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

export const SendsChart = () => {
  const transactions = useTransactionsStore((state) => state.transactions)
  const classes = useStyles()
  if (!transactions || transactions.length === 0) return <div>Loading...</div>

  return (
    <div className={classes.container}>
      <h2>Top 10 Senders</h2>
      <VictoryChart theme={VictoryTheme.material} width={600}>
        <VictoryBar
          style={{
            data: { fill: '#92bfb1' },
            labels: { fontSize: 7 },
          }}
          labels={({ datum }) => datum.y}
          horizontal
          data={top10Senders(transactions)}
        />
      </VictoryChart>
    </div>
  )
}
