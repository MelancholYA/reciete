import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const ItemsList = () => {
	const List = useSelector((state) => state);
	const dispatch = useDispatch();
	const updateOrders = (e, item) => {
		e
			? dispatch({
					type: 'ADD',
					data: item,
			  })
			: dispatch({
					type: 'REMOVE',
					data: item,
			  });
	};
	return (
		<ul className='App__left__items'>
			{List.meals.map((item) => (
				<li key={item.id}>
					{item.name}
					<div className='inputs'>
						<input
							type='number'
							min='1'
							defaultValue={item.num}
							onChange={(e) => {
								dispatch({
									type: 'MODIFY',
									data: item,
								});
								item.num = e.target.value;
							}}
						/>
						<span>$ {item.price}</span>

						<input
							type='checkbox'
							onChange={(e) => updateOrders(e.target.checked, item)}
						/>
					</div>
				</li>
			))}
		</ul>
	);
};

export default ItemsList;
