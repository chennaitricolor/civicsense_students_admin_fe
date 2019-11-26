import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {  MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: ['Sans-serif'].join(','),
        font: {
            color: '#333940',
        },
    },
    root: {
        color: '#333940',
    },
    palette: {
        tertiary: { main: '#004261' },
        primary: { main: '#fcfcfc' },
        secondary: { main: '#0099ff' },
        background: { default: '#fcfcfc' },
        error: { main: '#E10C32' },
        success: { main: '#00AB84' },
        buttonColor: { main: '#0099ff'}
    },
    overrides: {
        MuiSvgIcon: {
            root: {
                // fill: '#00B4D2',
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: 'white',
                color: '#333940',
            },
        },
        App: {
            content: {
                padding: '0px',
            },
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
