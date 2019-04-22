import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Home, Explore, Profile, Bookmarks } from './Pages';

//Routes every page
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Explore} />
        <Route path="/profile" component={Profile} />
        <Route path="/bookmarks" component={Bookmarks} />
      </Fragment>
    </Router >
  </Provider >
)

export default Root