import { useDispatch } from 'react-redux';

const Header = () => {
	const dispatch = useDispatch();
	const search = (e) => {
		e.preventDefault();
		let query = e.target.query.value;

		dispatch({
			type: 'SEARCHED',
			data: query,
		});
	};
	return (
		<header>
			<h3 className='title'>Items</h3>
			<form className='search' onSubmit={search}>
				<input type='text' name='query' placeholder='Search for an item...' />
				<button>
					<svg viewBox='0 0 20 20'>
						<path d='M18.125 15.804l-4.038-4.037a6.643 6.643 0 001.01-3.534C15.089 4.62 12.199 1.75 8.584 1.75 4.815 1.75 1.982 4.726 2 8.286c.021 3.577 2.908 6.549 6.578 6.549a6.464 6.464 0 003.44-.985l4.032 4.026c.167.166.43.166.596 0l1.479-1.478a.415.415 0 000-.594M8.578 13.99c-3.198 0-5.716-2.593-5.733-5.71-.017-3.084 2.438-5.686 5.74-5.686 3.197 0 5.625 2.493 5.64 5.624.017 3.33-2.604 5.772-5.647 5.772m7.771 2.991l-3.637-3.635c.131-.11.721-.695.876-.884l3.642 3.639-.881.88z'></path>
					</svg>
				</button>
			</form>
		</header>
	);
};

export default Header;
