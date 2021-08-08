import Header from './componants/Header';
import Side from './componants/Side';
import ItemsList from './componants/ItemsList';
import { Provider } from 'react-redux';
import store from './Redux/store';
function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<div className='App__left'>
					<Header />
					<ItemsList />
				</div>
				<Side />
			</div>
		</Provider>
	);
}

export default App;
