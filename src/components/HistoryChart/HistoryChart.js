import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { useTransactionsStore } from 'store/transactionsStore'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
  buttonStyle: {
    color: theme.palette.primary.dark,
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
    return <div>Loading Transaction Numbers History...</div>

  return (
    <div className={classes.container}>
      <h2>Transaction Numbers History</h2>
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
      <VictoryChart theme={VictoryTheme.material} width={1400}>
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
