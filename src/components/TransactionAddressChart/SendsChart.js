import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { useTransactionsStore } from 'store/transactionsStore'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
  buttonStyle: {
    color: theme.palette.primary.dark,
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
  const [timeLineSelection, updateTimelineSelection] = React.useState('1 Day')

  const transactions = useTransactionsStore((state) => {
    switch (timeLineSelection) {
      case '1 Day':
        return state.lastDayTransactions
      case '3 Days':
        return state.last3DayTransactions
      case '1 Month':
        return state.lastMonthsTransactions
      case 'All Time':
        if (state.allTransactions.length === 0) {
          state.fetchAll()
        }
        return state.allTransactions
    }

    return []
  })

  const onChange = (e) => {
    updateTimelineSelection(e.target.textContent)
  }

  const classes = useStyles()
  if (!transactions || transactions.length === 0)
    return <div>Loading Top 10 Senders...</div>

  return (
    <div className={classes.container}>
      <h2>Top 10 Senders</h2>
      <ButtonGroup
        aria-label="outlined primary button group"
        className={classes.buttonGroup}
        onClick={onChange}
      >
        <Button className={classes.buttonStyle}>1 Day</Button>
        <Button className={classes.buttonStyle}>3 Days</Button>
        <Button className={classes.buttonStyle}>1 Month</Button>
        <Button className={classes.buttonStyle}>All Time</Button>
      </ButtonGroup>
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
