import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useTransactionsStore } from 'store/transactionsStore'
import { TransactionHistoryChart } from 'components/HistoryChart/HistoryChart'
import { SendsChart } from 'components/TransactionAddressChart/SendsChart'
import { ReceivesChart } from 'components/TransactionAddressChart/ReceivesChart'
import SearchBar from './SearchBar/SearchBar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
}))

function App() {
  React.useEffect(async () => {
    useTransactionsStore.getState().fetch()
  }, [])
  const [searchTerm, handleSearch] = React.useState('')

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TransactionHistoryChart />
        </Grid>
        <Grid item xs={12}>
          <SendsChart />
        </Grid>
        <Grid item xs={12}>
          <ReceivesChart />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
