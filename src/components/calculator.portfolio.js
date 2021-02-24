// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
let columnHeader = ['Market', 'Risk %', 'Client\'s Amount $', 'Difference $', 'New Amount $'];


export default class CalculatorPortfolio extends Component {
  constructor(props) {
    super(props);
    this.generateHeader = this.generateHeader.bind(this);
    this.generateTableRows = this.generateTableRows.bind(this);
    this.onChangeAmountList = this.onChangeAmountList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      risk: [],
      amounts: [],
      differences: [],
      newAmounts: [],
      recomendation: '',
      title: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/advisor/risk/' + this.props.match.params.id)
      .then(response => {
        //console.log(response.data[0].name);
        let amounts = [];
        for(let i=0; i<response.data.length; i++){
          amounts[i] = 0;
        }
        this.setState({ ...this.state, title: response.data[0].name, risk: response.data , amounts:amounts});

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeAmountList(index, event){
    var amounts = [...this.state.amounts];
    if(event.target.value < 0){
      amounts[index] = 0.00;
    }else {
      amounts[index] = parseFloat(event.target.value);
    }
    this.setState({
      ...this.state,
      amounts:amounts
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let differences = [...this.state.differences];
    let newAmounts = [...this.state.newAmounts];
    //let sellRecomendation = '';
    //let buyRecomendation = '';
    let recomendation = '';
    let sumAmount = this.state.amounts.reduce((a, b) => a + b, 0);

    let iterateDifferentes = [];
    

    for(let i=0; i< this.state.risk.length; i++){
      newAmounts[i] = ((parseFloat(this.state.risk[i].percentage) * sumAmount) / 100).toFixed(2);
      differences[i] = (newAmounts[i] - this.state.amounts[i]).toFixed(2);
      iterateDifferentes.push({market: this.state.risk[i].item.name + '', diff: differences[i] * -1});
      /*if(differences[i] < 0){
        sellRecomendation+='sell $' + (Math.abs(differences[i])) + ' from ' + this.state.risk[i].item.name + ', ';
      } else if(differences[i] > 0){
        buyRecomendation+='buy $' + differences[i] + ' from ' + this.state.risk[i].item.name + ', ';
      }*/
    }

    iterateDifferentes.sort((a, b) => b.diff -a.diff);
    //console.log(iterateDifferentes);
    let last = iterateDifferentes.length-1;
    for(let first=0; first<iterateDifferentes.length; first++){
      if(first >=last) break;
      while(iterateDifferentes[first].diff > 0){
        if(iterateDifferentes[first].diff + iterateDifferentes[last].diff >=0){
          recomendation+='Transfer $' + (Math.abs(iterateDifferentes[last].diff)) + ' from ' + 
            iterateDifferentes[first].market + ' to ' + iterateDifferentes[last].market + '. ';
          iterateDifferentes[first].diff = iterateDifferentes[first].diff + iterateDifferentes[last].diff;
          iterateDifferentes[last].diff = 0;
        } else{
          recomendation+='Transfer $' + (Math.abs(iterateDifferentes[first].diff)) + ' from ' + 
            iterateDifferentes[first].market + ' to ' + iterateDifferentes[last].market + '. ';
            iterateDifferentes[first].diff = 0;
            iterateDifferentes[last].diff = iterateDifferentes[first].diff + iterateDifferentes[last].diff;
        }
        last--;
      }
    }
    

    this.setState(
      {...this.state, 
      differences:differences, 
      newAmounts:newAmounts, 
      recomendation:recomendation});
      //recomendation:sellRecomendation + buyRecomendation});

  }

  generateHeader() {
    let res = [];

    if (columnHeader.length > 0) {

      for (var i = 0; i < columnHeader.length; i++) {
        res.push(<th key={i + 1}>{columnHeader[i]}</th>)
      }

    }
    return res;
  }

  getTitle() {
    return this.state.title;
  }

  generateTableRows() {
    let res = [];
    for (var i = 0; i < this.state.risk.length; i++) {
      res.push(
        <tr key={i}>
          <td key="0">{this.state.risk[i].item.name}</td>
          <td key="1" align='center'>{this.state.risk[i].percentage}</td>
          <td key="2"><input type="number" value={this.state.amounts[i] || 0} onChange={this.onChangeAmountList.bind(this, i)}/></td>
          <td key="3"><input type="text" value={this.state.differences[i] || ''} readOnly disabled/></td>
          <td key="4"><input type="text" value={this.state.newAmounts[i] || ''} readOnly disabled/></td>
        </tr>
      )
    }
    return res;
  }
  render() {

    return (
      <div>
        <div className="input-group" style={{width:'100%'}}>
          <h3>{this.getTitle()} &nbsp;</h3>

          <input style={{float:'right', align:'right'}}
            align="right"
            type="submit" 
            value="Calculate" 
            className="btn btn-primary"
            onClick={this.onSubmit}
            />


        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              {this.generateHeader()}
            </tr>
          </thead>
          <tbody>
            {this.generateTableRows()}
          </tbody>
        </table>
        <div className="input-group">
          <label>Recommended Transfers: </label>
            <textarea
              style={{height:'100px'}}
              className="form-control"
              min="0.00" 
              max="10000.00" 
              step="1.00" 
              value={this.state.recomendation} readOnly disabled/>
        </div>
      </div>
    )
  }


}
