import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import FormGroup from "@material-ui/core/FormGroup"
import { Input, InputLabel } from "@material-ui/core"
import FormHelperText from "@material-ui/core/FormControl"
import uuid from 'uuid';
import JSencrypt from "jsencrypt";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Button } from '@material-ui/core';

class DataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      username: '',
      error: false,
      message: '',
      pin: "", pan: "", amount: "", expDate: "", open: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeExpDate = this.handleChangeExpDate.bind(this);
    this.handleChangePan = this.handleChangePan.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  handleChangePin(event) {
    this.setState({ pin: event.target.value });
  }
  handleChangePan(event) {
    this.setState({ pan: event.target.value });
  }
  handleChangeExpDate(event) {
    this.setState({ expDate: event.target.value });
  }
  handleChangeAmount(event) {
    this.setState({ amount: event.target.value });
  }


  setKey() {
    console.log("the state is ", this.state)
    fetch('https://beta.soluspay.net/api/consumer/key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "applicationId": "ACTSCon",
        "UUID": uuid.v4(),
        "tranDateTime": "191230142400"
      })
    })
      .then((response) => {
        if (!response.ok) {
          // return response.then(Promise.reject.bind(Promise))
          throw response
        }
        return response.json();
      })
      .then((data) => {
        console.log("the public key is", data.ebs_response.pubKeyValue)
        if (localStorage.getItem("key") != null) {
          localStorage.setItem("key", data.ebs_response.pubKeyValue)
        }
      })
      .catch(error => {
        console.log('error: ' + error);
        // error.json().then((body) => {
        //   console.log(body);
        // });
      });
  }

  generateIPin(pin, key) {
    // do something
    let id = uuid.v4()
    let jsencrypt = new JSencrypt();
    jsencrypt.setPublicKey(key);
    let data = jsencrypt.encrypt(id + pin);
    console.log("the private key encrypted is: ", data)
    return [data, id]
  }

  handleSubmit(event) {
    // event.preventDefault();
    if (!localStorage.getItem("key")) {
      this.setKey()
    }

    let key = localStorage.getItem("key")
    const [ipin, id] = this.generateIPin(this.state.pin, key)
    // console.log('A name was submitted: ' + data.data);
    fetch('https://beta.soluspay.net/api/consumer/p2p', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        "applicationId": "ACTSCon",
        "tranDateTime": "191230142400",
        "UUID": id,
        "PAN": this.state.pan,
        "IPIN": ipin,
        "expDate": this.state.expDate,
        "tranAmount": parseFloat(this.state.amount),
        "toCard": "3333333333333333333",
        "tranCurrencyCode": "SDG",
      })
    }).then((response) => {
      if (!response.ok) {
        // return response.then(Promise.reject.bind(Promise))
        throw response
      }
      return response.json();
    }).then((data) => {
      this.setState({ approval: data.responseMessage, error: false });
      console.log("the data is", data)
    }).catch(error => {
      console.log('error: ' + error);
      error.json().then((body) => {
        //Here is already the payload from API
        console.log(body);
        if (error.status > 500) {
          this.setState({ message: body.details.responseMessage, error: true, username: null });
        } else {
          this.setState({ message: body.message, error: true, username: null });

        }
      });
      // this.setState({error: true, message: error.message})
    });

    event.preventDefault()
  }

  handleOpen() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Donate to Raiffeisen
        </Typography>

          {/* Form */}
          <FormGroup>
            <form onSubmit={this.handleSubmit}>
              <Input id="email" aria-describedby="email" onChange={this.handleChangePin} />
              <InputLabel htmlFor="email">Email address</InputLabel>

              <Input id="pan" pattern=".{16,19}" required aria-describedby="pan" onChange={this.handleChangePan} />
              <InputLabel htmlFor="pan">Enter your PAN (16 or 19 digits)</InputLabel>

              <Input helperText="your internet PIN" pattern=".{4}" required type="password" id="pin" aria-describedby="pin" onChange={this.handleChangePin} />
              <InputLabel htmlFor="pin">Enter your PIN</InputLabel>

              <Input id="expDate" pattern=".{4}" required aria-describedby="expDate" onChange={this.handleChangeExpDate} />
              <InputLabel htmlFor="expDate">Enter your expDate</InputLabel>

              <Input type="number" step="0.01" id="amount" aria-describedby="amount" onChange={this.handleChangeAmount} />
              <InputLabel htmlFor="amount">How much you will pay</InputLabel>

              <Button type="submit" variant="contained" color="primary">
                If i work
            </Button>

            </form>
          </FormGroup>



          {this.state.error &&

            <div>
              <p onChange={this.handleChange}>There is an error: <b>{this.state.message}</b></p>
              <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Response Message"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {this.state.message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={this.handleClose}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          }

        </Box>
      </Container>

    );
  }
}

export default DataForm
