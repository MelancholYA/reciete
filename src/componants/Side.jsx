import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import logo from '../assets/logo.png';
import moment from 'moment';
import jsPDF from 'jspdf';
const Side = () => {
	const ticket = useRef(null);
	const headerRef = useRef(null);
	const dateRef = useRef(null);
	const ordersRef = useRef(null);
	ticket.current &&
		console.log(
			headerRef.current.offsetHeight,
			dateRef.current.offsetHeight,
			ordersRef.current.scrollHeight,
		);

	const orders = useSelector((state) => state.orders);
	const [total, setTotal] = useState(0);
	const printTicket = (action) => {
		const height =
			headerRef.current.clientHeight +
			dateRef.current.clientHeight +
			75 +
			orders.length * 18;
		console.log(height);
		const doc = new jsPDF(height > 350 ? 'p' : 'l', 'px', [height, 350]);
		doc.addImage(logo, 'PNG', 20, 20, 50, 50);
		doc.setFontSize(23);
		doc.text('Resturant Yacine', 330, 40, { align: 'right' });
		doc.setFontSize(14);
		doc.text('Your place for pleasure', 308, 60, { align: 'right' });
		doc.line(20, 85, 330, 85, 'FD');
		doc.setFontSize(10);
		doc.text(moment().format('MMMM Do YYYY'), 20, 100);
		doc.text(moment().format(' h:mm a'), 330, 100, { align: 'right' });
		doc.line(20, 110, 330, 110, 'FD');
		doc.setFontSize(14); // eslint-disable-next-line
		orders.map((order, i) => {
			doc.text(order.num.toString(), 20, 115 + 15 * (i + 1));
			doc.text(order.name, 30, 115 + 15 * (i + 1));
			doc.text(
				(order.price * order.num).toString() + ' $',
				330,
				115 + 15 * (i + 1),
				{
					align: 'right',
				},
			);
		});
		doc.text('Total :', 20, height - 50);
		doc.text(total.toFixed(2).toString() + ' $', 330, height - 50, {
			align: 'right',
		});
		doc.setFillColor(0, 28, 77);
		doc.rect(0, height - 25, 350, 25, 'F');
		doc.setTextColor(240, 248, 255);
		doc.text('Bon appetit', 175, height - 10, { align: 'center' });

		action === 'print' && doc.autoPrint();
		window.open(doc.output('bloburl'), '_blank');
	};
	useEffect(() => {
		let ttl = 0;
		orders.map((order) => (ttl += order.price * order.num));
		setTotal(ttl);
	}, [orders]);
	return (
		<div className='App__right' style={{ width: 350 }}>
			<div className='App__right__ticket' ref={ticket}>
				<header ref={headerRef}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='1080'
						height='1080'
						viewBox='0 0 1080 1080'>
						<defs>
							<clipPath id='clip-Instagram_Post_1'>
								<path d='M0 0H1080V1080H0z'></path>
							</clipPath>
						</defs>
						<g
							clipPath='url(#clip-Instagram_Post_1)'
							data-name='Instagram Post – 1'>
							<circle
								cx='540'
								cy='540'
								r='540'
								fill='#001a4d'
								data-name='Ellipse 1'></circle>
							<path
								fill='#cfdfff'
								d='M647.012-513.6a17.769 17.769 0 00-17.451-17.451c-10.739 0-18.793 8.054-18.793 17.451v204.037c0 151.685-124.838 280.551-279.208 280.551h-16.108c-154.37 0-279.208-128.865-279.208-280.551V-513.6c0-9.4-8.054-17.451-18.793-17.451A17.769 17.769 0 000-513.6v204.037C0-147.139 128.865-8.877 289.947 5.889l16.108 1.342v194.64a17.451 17.451 0 1034.9 0V7.232l16.108-1.342C432.236-.823 502.038-33.039 554.39-85.39v-1.342c59.063-59.063 92.622-138.262 92.622-222.83z'
								data-name='Path 1'
								transform='translate(216.494 695.864)'></path>
						</g>
					</svg>
					<span>
						<h3>Yacine Resturant</h3>
						<h6>Your place for pleasure</h6>
					</span>
				</header>
				<span className='App__right__ticket__date' ref={dateRef}>
					<span>{moment().format('MMMM Do YYYY')}</span>
					<span> {moment().format(' h:mm a')}</span>
				</span>
				<ul className='App__right__ticket__orders' ref={ordersRef}>
					{orders.map((order) => (
						<li>
							<span>
								{order.num} {order.name}
							</span>

							<span> {(order.price * order.num).toFixed(2)}$</span>
						</li>
					))}
				</ul>
			</div>
			<div className='App__right__actions'>
				<h3>Total : {total.toFixed(2)}$</h3>
				<button title='View' onClick={printTicket}>
					<svg viewBox='0 0 24 24'>
						<path d='M1.001 7.5a1 1 0 001-1V5c0-.552.449-1 1-1h1.5a1 1 0 100-2h-1.5c-1.654 0-3 1.346-3 3v1.5a1 1 0 001 1zM21.001 2h-1.5a1 1 0 100 2h1.5c.551 0 1 .448 1 1v1.5a1 1 0 102 0V5c0-1.654-1.346-3-3-3zM.001 19c0 1.654 1.346 3 3 3h1.5a1 1 0 100-2h-1.5c-.551 0-1-.448-1-1v-1.5a1 1 0 10-2 0V19zM23.001 16.5a1 1 0 00-1 1V19c0 .552-.449 1-1 1h-1.5a1 1 0 100 2h1.5c1.654 0 3-1.346 3-3v-1.5a1 1 0 00-1-1zM12 18.07c3.85 0 7.13-2.42 7.98-5.89.03-.12.03-.24 0-.36-.85-3.47-4.13-5.89-7.98-5.89s-7.13 2.42-7.98 5.89c-.03.12-.03.24 0 .36.85 3.47 4.13 5.89 7.98 5.89zM12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'></path>
					</svg>
				</button>
				<button title='Print' onClick={() => printTicket('print')}>
					<svg viewBox='0 0 20 20'>
						<path d='M17.453 12.691V7.723m0 4.968V7.723M1.719 12.691V7.723m16.562 4.968V7.723m-5.59 4.761H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0 2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0-2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0 2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0 0H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0-2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m-5.382.828h5.383a.415.415 0 000-.828H7.309c-.228 0-.414.187-.414.414s.186.414.414.414m5.382 1.243H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m3.934-8.489h-1.449V3.168a.415.415 0 00-.414-.414H5.238a.415.415 0 00-.414.414v2.898H3.375c-.913 0-1.656.743-1.656 1.656v4.969c0 .913.743 1.656 1.656 1.656h1.449v2.484c0 .228.187.414.414.414h9.523a.415.415 0 00.414-.414v-2.484h1.449c.912 0 1.656-.743 1.656-1.656V7.723a1.658 1.658 0 00-1.655-1.657M5.652 3.582h8.695v2.484H5.652V3.582zm8.696 12.836H5.652v-4.969h8.695v4.969zm3.105-3.727a.828.828 0 01-.828.828h-1.449v-2.484a.415.415 0 00-.414-.414H5.238a.415.415 0 00-.414.414v2.484H3.375a.827.827 0 01-.828-.828V7.723c0-.458.371-.828.828-.828h13.25c.457 0 .828.371.828.828v4.968zm-10.144.621h5.383a.415.415 0 000-.828H7.309c-.228 0-.414.187-.414.414s.186.414.414.414m0 2.071h5.383a.415.415 0 000-.828H7.309c-.228 0-.414.187-.414.414s.186.414.414.414m5.382-.828H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0-2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0 0H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828m0 2.071H7.309c-.228 0-.414.187-.414.414s.187.414.414.414h5.383a.415.415 0 00-.001-.828'></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Side;
