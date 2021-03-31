import React from 'react'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { useAddressStore } from 'store/addressStore'
import { useTransactionsStore } from 'store/transactionsStore'
import { formatTransactionsById } from 'utils/formatTransactions'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
  buttonStyle: {
    color: theme.palette.primary.dark,
  },
}))

export const TransactionTrendsChart = () => {
  const classes = useStyles()
  const [timeLineSelection, updateTimelineSelection] = React.useState('3 Days')
  const [transactions, updateTransactions] = React.useState([])
  const hash = useAddressStore((state) => state.addressHash)
  const address = useAddressStore((state) => state.address)
  const transactionsById = useTransactionsStore(
    (state) => state.transactionsById
  )

  React.useEffect(() => {
    if (transactionsById.size === 0) {
      useTransactionsStore.getState().fetchAll()
    }
  }, [])

  React.useEffect(() => {
    if (address) {
      updateTransactions(address.transactions)
    }

    if (timeLineSelection === '1 Day') {
      updateTransactions([
        ...address.transactions.filter((txn) => {
          const currDate = new Date()
          const txnDate = new Date(txn.txnDate)

          currDate.setDate(currDate.getDate() - 1)

          if (Date.parse(txnDate) >= Date.parse(currDate)) {
            return true
          } else {
            return false
          }
        }),
      ])
    } else if (timeLineSelection === '3 Days') {
      updateTransactions([
        ...address.transactions.filter((txn) => {
          const currDate = new Date()
          const txnDate = new Date(txn.txnDate)

          currDate.setDate(currDate.getDate() - 3)

          if (Date.parse(txnDate) >= Date.parse(currDate)) {
            return true
          } else {
            return false
          }
        }),
      ])
    } else if (timeLineSelection === '1 Month') {
      updateTransactions([
        ...address.transactions.filter((txn) => {
          const currDate = new Date()
          const txnDate = new Date(txn.txnDate)

          currDate.setDate(currDate.getDate() - 30)

          if (Date.parse(txnDate) >= Date.parse(currDate)) {
            return true
          } else {
            return false
          }
        }),
      ])
    }
  }, [timeLineSelection, address])

  const onChange = (e) => {
    updateTimelineSelection(e.target.textContent)
  }

  if (!transactions || transactions.length === 0 || transactionsById.size === 0)
    return <div>Loading Top interactions...</div>

  return (
    <div className={classes.container}>
      <h2>Top interactions {timeLineSelection}</h2>
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
          data={formatTransactionsById(transactions, transactionsById, hash)}
        />
      </VictoryChart>
    </div>
  )
}
