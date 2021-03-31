import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from 'pages/Home'
import { Address } from 'pages/Address'

function App() {
  return (
    <Router>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route path="/address/:hash" component={Address} />
    </Router>
  )
}

export default App
