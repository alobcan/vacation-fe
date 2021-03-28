import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './Pages/Auth';
import EventsPage from './Pages/Events';
import BookingsPage from './Pages/Bookings';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from='/' to='/auth' exact />
        <Route path='/auth' component={AuthPage} />
        <Route path='/events' component={EventsPage} />
        <Route path='/bookings' component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
