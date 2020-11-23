import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import { fetch } from './store/csrf';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));
  },[dispatch])

  //testing web apis:
  const [stocks, setStocks] = useState("")

  useEffect(() => {
    const fetchStocks = async () => {
      const stockRes = await fetch("https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=TSLA", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "53f7356341mshc65eeb2724095a3p13006bjsn73146423c5b3",
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
	}
})

      console.log(stockRes)
      setStocks(stockRes.data["Global Quote"])
    }
    fetchStocks()
  }, [])

  //end test


  return (
    <main>
      {/* {testing web apis} */}
      <div>{`${stocks["01. symbol"]}`}</div>
      <Navigation />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignUpFormPage />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
