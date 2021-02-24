// index.component.js

import React, { Component } from 'react';
import axios from 'axios';
import TableRowMarket from './tablerow.market';

export default class IndexPortfolio extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost:8080/api/advisor/portfolio')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRowMarket obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3>Portfolios</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Risk</th>
                <th>Market</th>
                <th>Percentage</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }
