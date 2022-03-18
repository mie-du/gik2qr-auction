import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { colors, typography } from '../../helpers/constants';

/* Theme for MUI is created as below. The <ThemeProvider> should then be added with this object in the ReactDOM.render-fuction */
const defaultTheme = createTheme();

const palette = {
  primary: colors.primary,
  secondary: colors.secondary,
  accGreen: defaultTheme.palette.augmentColor({
    color: { main: colors.accGreen.main }
  }),
  accPink: defaultTheme.palette.augmentColor({
    color: { main: colors.accPink.main }
  }),
  accBlue: defaultTheme.palette.augmentColor({
    color: { main: colors.accBlue.main }
  })
};

const theme = createTheme({
  palette,
  typography
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
