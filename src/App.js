// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateMarket from './components/create.market';
import EditMarket from './components/edit.market';
import IndexMarket from './components/index.market';

import CreatePortfolio from './components/create.portfolio';
import EditPortfolio from './components/edit.portfolio';
//import IndexPortfolio from './components/index.portfolio';
import ChildTablePortfolio from './components/child.table.portfolio';
import ChartPortfolio from './components/chart.portfolio';
import CalculatorPortfolio from './components/calculator.portfolio';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Financial Advisor</Link>
            <div className="" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              {/*<li className="nav-item">
                  <Link to={'/'} className="nav-link">Main</Link>
              </li>*/}
                <li className="nav-item">
                  <Link to={'/index-market'} className="nav-link">Markets</Link>
                </li>                
                {/*<li className="nav-item">
                  <Link to={'/create-market'} className="nav-link">New Market</Link>
            </li>*/}
                <li className="nav-item">
                  <Link to={'/index-portfolio'} className="nav-link">Portfolios</Link>
                </li>    
                {/*<li className="nav-item">
                  <Link to={'/create-portfolio'} className="nav-link">New Portfolio</Link>
          </li>*/}              
              </ul>
            </div>
          </nav> <br/>
          {/*<h2>Financial Advisor Admin</h2> <br/>*/}
          <Switch>
              <Route exact path='/create-market' component={ CreateMarket } />
              <Route path='/edit-market/:id' component={ EditMarket } />
              <Route path='/index-market' component={ IndexMarket } />
              <Route exact path='/create-portfolio' component={ CreatePortfolio } />
              <Route path='/edit-portfolio/:id' component={ EditPortfolio } />
              <Route path='/index-portfolio' component={ ChildTablePortfolio } />
              <Route path='/show-chart/:id' component={ ChartPortfolio } />
              <Route path='/show-calc/:id' component={ CalculatorPortfolio } />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
