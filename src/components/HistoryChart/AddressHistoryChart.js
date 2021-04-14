import React from 'react'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { useAddressStore } from 'store/addressStore'
import { formatTransactions } from 'utils/formatTransactions'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
  buttonStyle: {
    color: theme.palette.primary.dark,
  },
}))

export const AddressHistoryChart = () => {
  const classes = useStyles()
  const address = useAddressStore((state) => state.address)
  const [timeLineSelection, updateTimelineSelection] = React.useState('3 Days')
  const [transactions, updateTransactions] = React.useState([])

  React.useEffect(() => {
    if (address) {
      updateTransactions(address.transactions)
    }

    if (timeLineSelection === '3 Days') {
      updateTransactions([
        ...address.transactions.filter((txn) => {
          const currDate = new Date('04-04-2021')
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
          const currDate = new Date('04-04-2021')
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

  if (!address) return <div>Loading Transaction Numbers History...</div>

  return (
    <div className={classes.container}>
      <h2>ETH Spent History in last {timeLineSelection}</h2>
      <ButtonGroup
        aria-label="outlined primary button group"
        className={classes.buttonGroup}
        onClick={onChange}
      >
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
          data={formatTransactions(transactions)}
        />
      </VictoryChart>
    </div>
  )
}
