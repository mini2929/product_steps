import { motion } from 'framer-motion';

export default function SplitText({ children = '', style, interval = 0.1, delay = 0, duration = 0.3 }) {
	const textArr = [];
	for (const letter of children) textArr.push(letter === ' ' ? '\u00A0' : letter); // 공백을 &nbsp;로 변환

	const titStyle = {
		marginBottom: 50,
		fontWeight: 100,
		fontSize: '6vmax',
		fontFamily: 'raleway',
		lineHeight: 1,
		color: '#333',
		...style
	};

	const { init, active } = {
		init: { scale: 2, opacity: 0 },
		active: { scale: 1, opacity: 1 }
	};

	return (
		<h2 style={titStyle}>
			{textArr.map((el, idx) => (
				<motion.span style={{ display: 'inline-block' }} key={idx} initial={init} animate={active} transition={{ duration: duration, delay: interval * idx + delay }}>
					{el}
				</motion.span>
			))}
		</h2>
	);
}
