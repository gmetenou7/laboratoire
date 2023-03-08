import React, { Fragment, useState } from 'react'
import Barcode from 'react-barcode';
import { useBarcode } from '@createnextapp/react-barcode'
import { Button, Container, Form, Row } from 'react-bootstrap';

const CodeBar = () => {

    const [barcode, setBarcode]= useState("azzeerttyy")
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
          background: '#ffffff',
        }
    });
    const handleChange = (event) => {
        setBarcode(event.target.value ? event.target.value : '');
    };
    const downloadBarcode = () => {
        const canvas = document.getElementById("mybarcode");
        const pngUrl = canvas?.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "mybarcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
  return (
    <Fragment>
           <div style={{marginTop:30, marginBottom:30}}>
                <Form.Control  as="textarea" onChange={handleChange} style={{width:320}}
                value={barcode} placeholder="Barcode content"   color="secondary" 
                />
            </div>
            <div>
                {
                    barcode !== ''
                    ?
                    <canvas id="mybarcode" ref={inputRef} />
                    :
                    <p>No barcode preview</p>
                }
            </div>
            <div>
                {
                    barcode ? 
                    <Container  style={{marginTop:30}}>
                        {/* <Barcode value={barcode} format="CODE128" /> */}
                        {/* <Row  item xs={10}>
                        <Form.Control  as="textarea"
                            style={{fontSize:18, width:250, height:100}}
                            
                            defaultValue={barcode}
                            value={barcode}
                        />
                        </Row> */}
                        <Row item xs={2}>
                        <Button onClick={downloadBarcode} style={{marginLeft:10}} color="secondary">
                            Telecharger
                        </Button>
                        </Row>
                    </Container> :
                    ''
                }
            </div>
    </Fragment>
  )
}

export default CodeBar