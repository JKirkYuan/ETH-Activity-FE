import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useAddressStore } from 'store/addressStore'
import { AddressHistoryChart } from 'components/HistoryChart/AddressHistoryChart'
import { TransactionTrendsChart } from 'components/TransactionTrends/TransactionTrendsChart'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))

export const Address = () => {
  const classes = useStyles()
  const { hash } = useParams()
  const addressTxns = useAddressStore((state) => state.address)

  React.useEffect(() => {
    useAddressStore.getState().fetch(hash)
  }, [])

  return (
    <div className={classes.root}>
      <h2>Address: {hash}</h2>
      {!addressTxns || addressTxns.length === 0 ? (
        <div>Loading address transactions </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddressHistoryChart />
          </Grid>
          <Grid item xs={12}>
            <TransactionTrendsChart />
          </Grid>
          {/*
        <Grid item xs={12}>
          <ReceivesChart />
        </Grid> */}
        </Grid>
      )}
    </div>
  )
}
