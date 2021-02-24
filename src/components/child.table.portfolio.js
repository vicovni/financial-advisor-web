import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
let columnHeader = [];
let portfolio = {};

export default class ChildTablePortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = { business: [] };
        this.generateHeader = this.generateHeader.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/advisor/percentages')
            .then(response => {
                console.log(response.data.params);
                portfolio = response.data.params;
                console.log(Object.keys(response.data.params[0]));
                columnHeader = Object.keys(response.data.params[0]);
                this.setState({ business: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    generateHeader() {
        let res = [];
        
        if(columnHeader.length > 0){
            res.push(<th key={0}>{'Risk'}</th>);
            let head = [...columnHeader];
            if(head.indexOf('Risk') > -1) {head.splice(head.indexOf('Risk'), 1);}
            for (var i = 0; i < head.length; i++) {
                res.push(<th key={i+1}>{head[i] + ' %'}</th>)
            }    
            res.push(<th key="action" colSpan="2">Action</th>)
        }
        return res;
    }

    generateTableData(params) {
        let res = [];
        let i = 0;
        let par = {...params};
        res.push(<td key={i}>{par['Risk']}</td>);
        delete par.Risk;
        for(let key in par){
            i++;
            res.push(<td key={i}>{par[key]}</td>);
        }
        res.push(<td key="chart"><Link to={"/show-chart/" + params['Risk']} className="btn btn-primary">Chart</Link></td>)
        res.push(<td key="calculator"><Link to={"/show-calc/" + params['Risk']} className="btn btn-warning">Calculator</Link></td>)
        return res;
    }
    generateTableRows() {
        let res = [];
        let tableData = portfolio;
        for (var i = 0; i < tableData.length; i++) {
            res.push(
                <tr key={i}>
                    {this.generateTableData(tableData[i])}
                </tr>
            )
        }
        return res;
    }
    render() {
        return (
            <div>
                <h3>Portfolios</h3>
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
            </div>
        )
    }
}