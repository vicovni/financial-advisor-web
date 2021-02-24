// create.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePortfolio extends Component {

  constructor(props) {
	super(props);
    this.onChangeMarketName = this.onChangeMarketName.bind(this);
    this.onChangeMarketSymbol = this.onChangeMarketSymbol.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = { 
      market : {
        name: '',
        symbol: ''
      }
    }
  }
  onChangeMarketName(e) {
    this.setState(
      { 
        market: {
          ...this.state.market,
          name: e.target.value
        }
      }
    );
  }
  onChangeMarketSymbol(e) {
    this.setState(
      { 
        market: {
          ...this.state.market,
          symbol: e.target.value
        }
      }
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      ...this.state.market
    };
    console.log(obj);
    const options = {
      headers: {"Content-Type": "application/json"}
    };
    axios.post('http://localhost:8080/api/advisor/portfolio', obj, options)
        .then(res => console.log(res.data));
    
    this.setState({
      market : {
        name: '',
        symbol: ''
      }
 
    })
  }	
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Market</h3><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Market Name:  </label>
                        <input 
                        	type="text" 
                        	className="form-control"
                        	value={this.state.market.name}
                        	onChange={this.onChangeMarketName}
                        	/>
                    </div>
                    <div className="form-group">
                        <label>Market Symbol: </label>
                        <input 
                        	type="text" 
                        	className="form-control"
                        	value={this.state.market.symbol}
                        	onChange={this.onChangeMarketSymbol}
                        	/>
                    </div>

                    <div className="form-group">
                        <input 
                        	type="submit" 
                        	value="Create Market" 
                        	className="btn btn-primary"
                        	/>
                    </div>
                </form>
            </div>
        )
    }
}
