import React, { Component } from 'react'

import './Calculator.css'

import Button from '../components/button/Button'
import Display from '../components/display/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {

  state = { ...initialState }

  constructor(props) {
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  calculateValues(values, operation) {
    switch (operation) {
      case '+':
        values[0] = values[0] + values[1]
        break
      case '-':
        values[0] = values[0] - values[1]
        break
      case '*':
        values[0] = values[0] * values[1]
        break
      case '/':
        values[0] = values[0] / values[1]
        break
      default:
        values[0] = this.state.values[0]
        break
    }
    values[1] = 0

    return values

  }

  finishOperation(values, equals, operation) {
    this.setState({
      displayValue: values[0],
      operation: equals ? null : operation,
      current: equals ? 0 : 1,
      clearDisplay: !equals,
      values
    })
  }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = this.calculateValues([...this.state.values], this.state.operation)
      this.finishOperation(values, equals, operation)

    }
  }

  addDigit(digit) {
    //Regra para não permitir colocar o ponto de casas decimais mais de uma vez
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return
    }

    //Para não permitir vários zeros à esqueda
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + digit
    this.setState({ displayValue, clearDisplay: false })

    if (digit !== '.') {
      const index = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]

      values[index] = newValue
      this.setState({ values })
    }
  }

  render() {

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    )
  }

}