import LIST from '../../assets/meals.json';
const deafultState = LIST;
const search = (e) => {
	return deafultState.filter(
		(item) => item.name.toLowerCase().includes(e.toLowerCase()) && item,
	);
};
function meal(state = deafultState, action) {
	switch (action.type) {
		case 'SEARCHED':
			return search(action.data);

		default:
			return state;
	}
}

export default meal;
