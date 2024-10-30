import { useRef, useEffect, useState } from 'react';
import SplitText from '../common/SplitText';

export default function BrandStory() {
	const memberData = [
		{ name: 'Angelo', text: 'CEO', pic: '/CEO.jpg' },
		{ name: 'Peter', text: 'Creative', pic: '/creative.png' },
		{ name: 'Paul', text: 'Model', pic: '/model.png' },
		{ name: 'Perfume', text: 'Best Product', pic: '/p1.jpg' }
	];

	const [scrolled, setScrolled] = useState(0);
	const [PosArr, setPosArr] = useState([]);
	const ref_el = useRef(null);

	const getPos = () => {
		const arr = [];
		for (const el of ref_el.current.children) arr.push(el.offsetTop);
		setPosArr(...arr);
	};

	const handleScroll = () => {
		setScrolled(window.scrollY);
	};
	useEffect(() => {
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const ceoSubTitleRef = useRef(null);
	const ceoImgRef = useRef(null);

	useEffect(() => {
		// 초기화
		// if (ceoTitleRef.current) ceoTitleRef.current.classList.remove('on');
		if (ceoSubTitleRef.current) ceoSubTitleRef.current.classList.remove('on');
		if (ceoImgRef.current) ceoImgRef.current.classList.remove('on');

		// 각 요소에 'on' 클래스 추가
		setTimeout(() => {
			// if (ceoTitleRef.current) ceoTitleRef.current.classList.add('on');
			if (ceoSubTitleRef.current) ceoSubTitleRef.current.classList.add('on');
			if (ceoImgRef.current) ceoImgRef.current.classList.add('on');
		}, 500);
	}, []);

	const [isFirstTextRendered, setIsFirstTextRendered] = useState(false);

	useEffect(() => {
		// 첫 번째 SplitText가 렌더링된 후 1초 후에 두 번째 SplitText를 렌더링
		const timer = setTimeout(() => {
			setIsFirstTextRendered(true);
		}, 1200); // 필요에 따라 시간 조정

		return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
	}, []);

	return (
		<main title='BrandStory'>
			<article className='ceoBox'>
				<div className='story'>
					<nav className='ceoTitle'>
						<SplitText style={{ margin: '25px 0px', fontFamily: 'Noto Serif KR', fontWeight: 'bold', fontSize: '1.8rem', color: `rgba(var(--keyRGB))` }}>
							향기의 권위자 Angelo의
						</SplitText>
						{isFirstTextRendered && (
							<SplitText style={{ margin: '40px 0px', fontFamily: 'Noto Serif KR', fontWeight: 'bold', fontSize: '1.8rem', color: `rgba(var(--keyRGB))` }}>
								단독 Brand 론칭
							</SplitText>
						)}
					</nav>
					<nav className='ceoSubTitle' ref={ceoSubTitleRef}>
						<p>남자의 향을 완성하다</p>
						<p>SINCE 1990</p>
						<p>젊은날의 성공을 함께 전달하다</p>
						<p>AVALLION의 IMAGE</p>
					</nav>
				</div>

				<div className='ceoImg' ref={ceoImgRef}>
					<img className='ceo' src={memberData[0].pic} alt={memberData[0].name} />
				</div>
			</article>

			<section className='mid_1'>
				<div className='mid_1-1'>
					<div className='minibox' style={{ transform: `translateX(${scrolled}px)` }}>
						<p>
							All day /<br /> All together /<br /> All in One
						</p>
						<p>멋진 남성으로 기억되는 그 시작</p>
					</div>
				</div>
				<div className='mid_1-2'>
					<p>자연유래성분으로 피부에 자극없이 부드럽게 감싸며 하루의 시작과 끝을 함께하는 All day/ All together/ All in One 지향</p>
					<p>완벽한 서포트를 꿈꾸는 아발론</p>
				</div>
			</section>

			<section className='mid_2'>
				{memberData.slice(1, 3).map((data, idx) => (
					<article key={idx + 1}>
						<div className='pic'>
							<img className='others' src={data.pic} alt={data.name} />
						</div>
						<h3>{data.name}</h3>
						<p>{data.text}</p>
					</article>
				))}
			</section>

			<section className='last'>
				<div className='combineImg'>
					<img className='perfume' src={memberData[3].pic} alt={memberData[3].name} />
					<div className='bgBox'></div>
				</div>
				<div className='lastText'>
					<p>완벽함의 마침표</p>
					<p>
						Orgainc Based
						<br /> Classified Perfume
					</p>
					<div
						className='buttons
					'>
						<button>information</button>
						<button>pictures</button>
					</div>
				</div>
			</section>
		</main>
	);
}
