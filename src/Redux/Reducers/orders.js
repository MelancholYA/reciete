const deafultState = [];
function orders(state = deafultState, action) {
	const remove = (state, removed) => {
		return state.filter((item) => item.id !== removed.id);
	};
	const modify = (state, modified) => {
		return state.map((item) => (item.id === modified.id ? modified : item));
	};
	switch (action.type) {
		case 'ADD':
			return [...state, action.data];
		case 'REMOVE':
			return remove(state, action.data);
		case 'MODIFY':
			return modify(state, action.data);

		default:
			return state;
	}
}

export default orders;
