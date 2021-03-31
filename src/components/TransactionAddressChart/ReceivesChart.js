import React from 'react'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { useTransactionsStore } from 'store/transactionsStore'
import { top10Receivers } from 'utils/formatTransactions'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
    marginBottom: '100px',
  },
  buttonStyle: {
    color: theme.palette.primary.dark,
  },
}))

export const ReceivesChart = () => {
  const [timeLineSelection, updateTimelineSelection] = React.useState('3 Days')

  const transactions = useTransactionsStore((state) => {
    switch (timeLineSelection) {
      case '1 Day':
        return state.lastDayTransactions
      case '3 Days':
        return state.last3DayTransactions
      case '1 Month':
        return state.lastMonthsTransactions
      case 'All Time':
        return state.allTransactions
    }

    return []
  })

  const onChange = (e) => {
    updateTimelineSelection(e.target.textContent)
  }

  const classes = useStyles()
  if (!transactions || transactions.length === 0)
    return <div>Loading Top 10 Receivers...</div>

  return (
    <div className={classes.container}>
      <h2>Top 10 Receivers in last {timeLineSelection}</h2>
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
          data={top10Receivers(transactions)}
        />
      </VictoryChart>
    </div>
  )
}
