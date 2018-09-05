import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0.00,
      term: 15,
      payment: null };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  calculate(e) {
    e.preventDefault();
    const rate = parseFloat(this.state.rate) / 100 / 12;
    const term = parseFloat(this.state.term) * 12;
    const balance = parseFloat(this.state.balance);
    const numerator = rate * Math.pow(1 + rate, term);
    const denominator = Math.pow(1 + rate, term) - 1;
    const mPayment = balance * (numerator / denominator);
    const result = mPayment.toFixed(2);
    this.setState({
      payment: result,
    });
  }
  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <form className='form-horizontal' onSubmit={ this.calculate }>
        <div className='col-sm-10'>
          <label htmlFor='balance' className='col-sm-offset-2 col-sm-2 control-label'>Loan Balance</label>
          <div className='form-group-md col-sm-8'>
            <br/>
            <input className='form-control' name='balance' type='number' min='1' max='999999' value={ this.state.balance } onChange={ this.handleChange } />
          </div>
        </div>
        <div className='col-sm-10'>
          <label htmlFor='rate' className='col-sm-offset-2 col-sm-2 control-label'>Interest Rate</label>
          <div className='form-group-md col-sm-8'>
            <br />
            <input name='rate' className='form-control' type='number' step='0.01' min='1' max='20' value={ this.state.rate } onChange={ this.handleChange } />
          </div>
        </div>
        <div className='col-sm-10'>
          <label htmlFor='term' className='col-sm-offset-2 col-sm-2 control-label'>Loan Term (years)</label>
          <div className='form-group-md col-sm-8'>
            <br />
            <select name='term' className='form-control' value={ this.state.term } onChange={ this.handleChange } >
              <option>15</option>
              <option>30</option>
            </select>
            <br />
          </div>
        </div>
        <div className='col-sm-10'>
          <label htmlFor='output' className='col-sm-offset-2 col-sm-2 control-label'>Monthly Payment</label>
          <div className='form-group-md col-sm-8'>
            <input type='number' name='output' id='output' value={ this.state.payment } className='form-control' disabled />
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-5 col-sm-2'>
            <br />
            <button name='submit' type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </div>
        </form>
      </div>
    );
  }
}
