import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import Details from "./details"
import Divider from "@material-ui/core/Divider"
import LocalRouter from "./routes"
import Bar from "./bar"
import Fail from './fail';
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
    <Bar />
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {/* <App /> */}
    <Divider />
    <LocalRouter />
    {/* <App  /> */}

  </ThemeProvider>,
  </I18nextProvider>,

  document.querySelector('#root'),
);
