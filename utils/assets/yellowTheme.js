import { createTheme } from '@mui/material/styles';

export const yellowTheme = createTheme({
  status: {
    danger: '#eab308',
  },
  palette: {
    primary: {
      main: '#ca8a04',
      darker: '#ca8a04',
    },
    neutral: {
      main: 'eab308',
      contrastText: '#fff',
    },
  },
});