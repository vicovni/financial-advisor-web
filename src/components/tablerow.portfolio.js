// TableRow.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRowPortfolio extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios.delete('http://localhost:8080/api/advisor/portfolio/' + this.props.obj.id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err));
    window.location.assign("/index-portfolio");
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.symbol}
        </td>
        <td>
          <Link to={"/edit-portfolio/" + this.props.obj.id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRowMarket;
