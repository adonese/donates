import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormGroup from "@material-ui/core/FormGroup"
import { Input, InputLabel } from "@material-ui/core"
import uuid from 'uuid';
import JSencrypt from "jsencrypt";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaymentIcon from '@material-ui/icons/Payment';
import CancelIcon from "@material-ui/icons/Cancel"
import MomentUtils from '@date-io/moment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import i18n from "./i18n";

import { Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const qs = require('query-string');



// const [responseHooks, setResponse] = useState();

class DataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 1,
      value: '',
      username: '',
      error: false,
      success: false,
      message: '',


      passedAmount: qs.parse(window.location.search, { ignoreQueryPrefix: true })["amount"],
      id: qs.parse(window.location.search, { ignoreQueryPrefix: true })["id"],
      token: qs.parse(window.location.search, { ignoreQueryPrefix: true })["token"],


      pin: "",
      pan: "",
      amount: this.passedAmount,
      expDate: "",
      open: true,
      disabled: false,
      selectedMoment: this.props.value
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeExpDate = this.handleChangeExpDate.bind(this);
    this.handleChangePan = this.handleChangePan.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeDonors = this.handleChangeDonors.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
  }


  handleChangePin(event) {
    this.setState({ pin: event.target.value });
  }

  handleChangePan(event) {
    this.setState({ pan: event.target.value });
  }

  handleChangeExpDate(date) {
    let m = date.format("YYMM")
    console.log("the wanted date is: ", m)
    this.setState({ expDate: m, selectedMoment: date });
    console.log("the selected date is", date)
  }

  handleChangeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  handleChangeDonors(event) {
    console.log("the value is: ", event.target.value)
    this.setState({ toCard: event.target.value });
  }

  setKey() {
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

        localStorage.setItem("key", data.ebs_response.pubKeyValue)

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
    console.log("the key is: ", key)
    let id = uuid.v4()
    let jsencrypt = new JSencrypt();
    jsencrypt.setPublicKey(key);
    let data = jsencrypt.encrypt(id + pin);
    console.log("the private key encrypted is: ", data)
    return [data, id]
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("The params are: ", this.state.id)
    if (!localStorage.getItem("key")) {
      this.setKey()
    }

    let key = localStorage.getItem("key")
    const [ipin, id] = this.generateIPin(this.state.pin, key)

    // console.log('A name was submitted: ' + data.data);
    fetch('https://beta.soluspay.net/api/v1/payment/sahil' + `?id=${this.state.id}&token=${this.state.token}`, {
      method: 'POST', redirect: "follow",
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
        "tranAmount": parseFloat(this.state.passedAmount),
        "serviceProviderId": "0010060207",
        "tranCurrencyCode": "SDG",
        "id": this.state.id,
      })
    }).then((response) => {
      if (!response.ok) {
        // return response.then(Promise.reject.bind(Promise))
        throw response
      }
      if (response.redirected) {
        window.location.href = response.url;
      }
      // return response.json()
    }).then((data) => {
      // setResponse(data)
      // this.props.history.push('/success', { message: data.ebs_response.responseMessage, code:data.ebs_response.responsecode })
      this.setState({ success: true, message: data.ebs_response.responseMessage, approval: data.ebs_response.responseMessage, error: false });
      console.log("the data is", data.ebs_response)
    }).catch(error => {
      // console.log('error: ' + error.ebs_response);
      if (error.status >= 400 || error.status >= 500) {
        error.json().then((body) => {

          console.log(body);
          if (error.status > 500) {
            // this.props.history.push('/fail', { message: body.details.responseMessage, code: body.details.responseCode })
            this.setState({ message: body.details.responseMessage, error: true, username: null });
          } else {
            this.setState({ message: body.message, error: true, username: null });
            console.log("the message is: ", this.state.message);
          }
        });
      }

      // this.setState({error: true, message: error.message})
    });

    this.setState({ disabled: true })
    event.preventDefault()
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleCancel(event) {
    event.preventDefault();
    let uuid = this.id;
    console.log(uuid);
    fetch(`https://beta.soluspay.net/api/v1/cancel?id=${this.state.token}`, {
      method: 'POST', redirect: "follow",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uuid": uuid,
      })
    }).then((response) => {
      console.log("response is: ", response)
      window.location.href = "https://sahil2.soluspay.net?code=transaction_cancelled"
      // window.open("", "_self");
      // window.close();
    })


  }

  handleClose() {
    this.setState({ open: false, disabled: false })
  }

  handleLanguage(event) {
    let prev  = this.state.lang;
    this.setState(({ lang:  !prev}));
    if (prev) {
      i18n.changeLanguage("ar");
      return
    }
    i18n.changeLanguage("en");

  }

  render() {
    return (
      <Container maxWidth="sm">

        <FormControlLabel
        checked={this.state.lang}
          control={<Switch onChange={this.handleLanguage} />}
          label={i18n.t("language")}
        />


        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {i18n.t("name")}
          </Typography>

          {/* Form */}
          <FormGroup>
            <form onSubmit={this.handleSubmit}>

              <Input id="pan" pattern=".{16,19}" required aria-describedby="pan" onChange={this.handleChangePan} />
              <InputLabel htmlFor="pan">{i18n.t("pan")}</InputLabel>

              <Input pattern=".{4}" required type="password" id="pin" aria-describedby="pin" onChange={this.handleChangePin} />
              <InputLabel htmlFor="pin">{i18n.t("pin")}</InputLabel>

              {/* <Input type="data" id="expDate" pattern=".{4}" required aria-describedby="expDate" onChange={this.handleChangeExpDate} /> */}
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="YYYY/MM"
                  margin="normal"
                  id="expDate"
                  label="Please select expiration date"
                  value={this.state.selectedMoment}
                  onChange={this.handleChangeExpDate}
                />
              </MuiPickersUtilsProvider>


              <InputLabel htmlFor="expDate">{i18n.t("expDate")}</InputLabel>

              <Input type="number" step="0.01" id="amount" aria-describedby="amount" disabled value={this.state.passedAmount} />
              <InputLabel htmlFor="amount">{i18n.t("amount")}</InputLabel>

              <br></br>
              <Button disabled={this.state.disabled} onClick={this.handleSubmit} variant="contained" color="primary" startIcon={<PaymentIcon />}>
                {"Pay " + this.state.passedAmount + "$"}
              </Button>

              <br /><br />
              <Button variant="contained" color="red" startIcon={<CancelIcon />} onClick={this.handleCancel}>
                {i18n.t("cancel")}
              </Button>

            </form>
          </FormGroup>

          {this.state.error &&

            <div>

              {/* <Redirect to="/fail" theme={this.state.message}/> */}
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


          {this.state.success &&
            < div >
              {/* <Redirect to="/success"/> */}
              <p onChange={this.handleChange}>{i18n.t("success")} <b>{this.state.message}</b></p>
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
      </Container >

    );
  }
}

export default DataForm
