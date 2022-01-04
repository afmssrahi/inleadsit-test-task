import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ListOfCategory from './components/ListOfCategory';
import ListOfEmployee from './components/ListOfEmployee';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

function App() {
	return (
		<div>
			<h1 className='text-center'>Inleads IT test task</h1>
			<Router>
				<Navigation></Navigation>
				<Switch>
					<Route exact path='/'>
						<ListOfEmployee></ListOfEmployee>
					</Route>
					<Route path='/employee'>
						<ListOfEmployee></ListOfEmployee>
					</Route>
					<Route path='/category'>
						<ListOfCategory></ListOfCategory>
					</Route>
					<Route path='*'>
						<NotFound></NotFound>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
