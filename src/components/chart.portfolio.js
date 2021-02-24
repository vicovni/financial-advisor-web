// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import randomColor from "randomcolor";

export default class ChartPortfolio extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      risk : []
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8080/api/advisor/risk/' + this.props.match.params.id)
          .then(response => {
              this.setState({risk:response.data});
          })
          .catch(function (error) {
              console.log(error);
          })
    }



  render() {
    let values = [];
    for(let i=0; i<this.state.risk.length; i++){
      values.push({title: this.state.risk[i].item.name, value: this.state.risk[i].percentage, color: randomColor()});
    } 
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Chart</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  </tr>
              </thead>
              <tbody>
              <tr>
                <td style={{textAlign:'center'}} >
                <div style={{width: '50%'}} >
              <PieChart
                data={values} 
                lineWidth="50"
                labelStyle={{
                  fontSize: '8px',
                  fontFamily: 'sans-serif',
                  fill: '#fffff',
                }}
                labelPosition={75}
                label={({ dataEntry }) => dataEntry.value + '%'}
                //totalValue={100}
                //lineWidth={20}
              />
            </div>
                </td>
                <td style={{display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', verticalAlign: 'center'}}>
                <div>
            <Link to={"/index-portfolio" } className="btn btn-warning" >Back</Link>
            </div>
                </td>
              </tr>
              </tbody>
            </table>


        </div>
    )
  }
}
