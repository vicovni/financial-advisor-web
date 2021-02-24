// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class EditMarket extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSymbol = this.onChangeSymbol.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
      market : {
        name: '',
        symbol: ''
      }
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8080/api/advisor/item/' + this.props.match.params.id)
          .then(response => {
              this.setState({market:{ 
                id: response.data.id, 
                name: response.data.name,
                symbol: response.data.symbol,
              }});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeName(e) {
      this.setState(
        { 
          market: {
            ...this.state.market,
            name: e.target.value
          }
        }
      );
   }
  onChangeSymbol(e) {
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
    const options = {
      headers: {"Content-Type": "application/json"}
    };
    console.log(obj);
    axios.post('http://localhost:8080/api/advisor/item', obj, options)
        .then(res => console.log(res.data));
    
    window.location.assign("/index-market");
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Update Market</h3>
            <form onSubmit={this.onSubmit}>
            	
                <div className="form-group">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.market.name}
                      onChange={this.onChangeName}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Symbol: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.market.symbol}
                      onChange={this.onChangeSymbol}
                      readOnly
                      />
                </div>
                {/*<div className="form-group">
                    <input type="submit" 
                      value="Update Market" 
                      className="btn btn-primary"/>
    </div>*/}
            </form>
        </div>
    )
  }
}
