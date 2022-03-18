import {
  AppBar,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import './App.css';
import { colors } from '../../helpers/constants';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { ItemDetail } from './Views/ItemDetail';

import { AllItems } from './Views/AllItems';

function App() {
  console.log();
  return (
    <div
      style={{ backgroundColor: colors.secondary.light, minHeight: '100vh' }}>
      <Router>
        <header
          style={{ backgroundColor: colors.accBlue.light, padding: '1rem' }}>
          <Typography
            sx={{ textShadow: `2px 2px 5px ${colors.accBlue.main}` }}
            variant='h1'>
            Tassens auktioner
          </Typography>
        </header>

        <Toolbar
          sx={{
            justifyContent: 'flex-end',
            backgroundColor: colors.primary.main,
            color: 'white'
          }}>
          <Button color='inherit'>
            <Link to='/'>Visa alla produkter</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/auctions/'>Visa pågående auktioner</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/items/new'>Skapa produkt</Link>
          </Button>
        </Toolbar>

        <Container maxWidth='xl'>
          <Paper elevation={8} sx={{ padding: 3 }}>
            <Switch>
              <Route exact path='/' component={AllItems}></Route>
              <Route exact path='/item/:id' component={ItemDetail}></Route>
              <Route exact path='/item/:id' component={ItemDetail}></Route>
              <Route exact path='/item/:id' component={ItemDetail}></Route>
            </Switch>
          </Paper>
        </Container>
      </Router>
    </div>
  );
}

export default App;
