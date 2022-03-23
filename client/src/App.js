import { Button, Container, Paper, Toolbar, Typography } from '@mui/material';
import './App.css';
import { colors } from './helpers/constants';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ItemDetail } from './Views/ItemDetail';
import { AllItems } from './Views/AllItems';
import { AuctionEdit } from './Views/AuctionEdit';

function App() {
  return (
    <div
      style={{ backgroundColor: colors.secondary.light, minHeight: '100vh' }}>
      <Router>
        <header
          style={{ backgroundColor: colors.accPink.dark, padding: '1rem' }}>
          <Typography
            sx={{ textShadow: `2px 2px 5px ${colors.primary.dark}` }}
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
            <Link to='/items'>Visa alla produkter</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/auctions/'>Visa pågående auktioner</Link>
          </Button>
          <Button color='inherit'>
            <Link to='/auctions/new'>Skapa auktion</Link>
          </Button>
        </Toolbar>

        <Container maxWidth='xl'>
          <Paper
            elevation={8}
            sx={{ padding: 3, backgroundColor: 'rgba(255,255,255,.6)' }}>
            <Switch>
              <Route exact path='/' component={AllItems}></Route>
              <Route exact path='/items' component={AllItems}></Route>
              <Route exact path='/items/new' component={AllItems}></Route>
              <Route path='/items/:id' component={ItemDetail}></Route>
              <Route exact path='/auctions' component={AllItems}></Route>
              <Route path='/auctions/new' component={AuctionEdit}></Route>
            </Switch>
          </Paper>
        </Container>
      </Router>
    </div>
  );
}

export default App;
