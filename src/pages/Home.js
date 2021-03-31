import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useTransactionsStore } from 'store/transactionsStore'
import { TransactionHistoryChart } from 'components/HistoryChart/HistoryChart'
import { SendsChart } from 'components/TransactionAddressChart/SendsChart'
import { ReceivesChart } from 'components/TransactionAddressChart/ReceivesChart'
import { SearchBar } from 'components/SearchBar/SearchBar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
}))

export const Home = ({ history }) => {
  React.useEffect(() => {
    useTransactionsStore.getState().fetch()
  }, [])

  const [searchTerm, handleSearch] = React.useState('')

  React.useEffect(() => {
    if (searchTerm) {
      history.push({
        pathname: `/address/${searchTerm}`,
      })
    }
  }, [searchTerm])

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
      </Grid>
    </div>
  )
}
