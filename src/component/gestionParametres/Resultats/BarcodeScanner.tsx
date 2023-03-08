import React, { Component } from 'react'
import Scanner from './Scanner.tsx'

import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

class BarcodeScanner extends Component {
  state = {
    results: [],
  }

  _scan = () => {
    this.setState({ scanning: !this.state.scanning })
  }

  _onDetected = result => {
    this.setState({ results: [] })
    this.setState({ results: this.state.results.concat([result]) })
  }

  render() {
    return (
      <div>
        
        <span>Barcode Scanner</span>
        
        <Button variant="primary" style={{marginTop:30, width:640, height:320}}>
          <Scanner onDetected={this._onDetected} />
        </Button>

        <Form.Control
            style={{fontSize:32, width:320, height:100, marginTop:30}}
            as="textarea"
            defaultValue={'No data scanned'}
            value={this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'}
        />

      </div>
    )
  }
}

export default BarcodeScanner
