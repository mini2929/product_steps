import { useRef, useEffect, useState } from 'react';
import SplitText from '../common/SplitText';
import ButtonPath from '../../hooks/useNavigater';

export default function BrandStory() {
	const memberData = [
		{ name: 'Angelo', text: 'CEO', pic: '/CEO.jpg' },
		{ name: 'Peter', text: 'Creative', pic: '/creative.png' },
		{ name: 'Paul', text: 'Model', pic: '/model.png' },
		{ name: 'Perfume', text: 'Best Product', pic: '/p1.jpg' }
	];

	const [scrolled, setScrolled] = useState(0);
	const [PosArr, setPosArr] = useState([]);
	const [opacity, setOpacity] = useState(0);
	const [mid2Opacity, setMid2Opacity] = useState(0);
	const ref_el = useRef(null);

	// 클래스 이름으로 위치 반환
	const targetClassName = '.mid_1, .mid_2, .combineImg';

	const getPos = () => {
		const elements = ref_el.current.querySelectorAll(targetClassName);
		console.log('Found elements:', elements);
		const newPosArr = Array.from(elements).map(el => el.offsetTop);

		setPosArr(newPosArr);
	};

	const handleScroll = () => {
		const scrollY = window.scrollY;
		setScrolled(scrollY);
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		console.log('PosArr updated:', PosArr);
	}, [PosArr]);

	useEffect(() => {
		// opacity 값 설정: scrolled가 PosArr[0] 이상일 때 opacity를 1로 설정
		if (PosArr[0]) {
			setOpacity(Math.min(1, (scrolled - PosArr[0] + 400) / 400)); // 400px 스크롤 후 opacity가 1로
		}
		// .mid_2의 opacity와 transform 설정
		if (PosArr[1]) {
			setMid2Opacity(Math.min(1, scrolled - PosArr[1] + 300));
		} else {
			setMid2Opacity(0); // 초기화
		}
	}, [scrolled, PosArr]);

	const ceoSubTitleRef = useRef(null);
	const ceoImgRef = useRef(null);
	const combinImgRef = useRef(null);

	useEffect(() => {
		// 초기화
		if (ceoSubTitleRef.current) ceoSubTitleRef.current.classList.remove('on');
		if (ceoImgRef.current) ceoImgRef.current.classList.remove('on');

		// 각 요소에 'on' 클래스 추가
		setTimeout(() => {
			if (ceoSubTitleRef.current) ceoSubTitleRef.current.classList.add('on');
			if (ceoImgRef.current) ceoImgRef.current.classList.add('on');
		}, 500);
	}, []);

	const [isFirstTextRendered, setIsFirstTextRendered] = useState(false);

	// 첫 번째 SplitText가 렌더링된 후 1초 후에 두 번째 SplitText를 렌더링
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsFirstTextRendered(true);
		}, 1200); // 필요에 따라 시간 조정

		return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
	}, []);

	return (
		<main title='BrandStory' ref={ref_el}>
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

			<section
				className='mid_1'
				style={{
					left: `${scrolled - (PosArr[0] || 0)}px`, // 원래 위치에서 스크롤 거리를 빼줌
					position: 'relative',
					transition: 'left 0.3s ease',
					opacity: opacity
				}}>
				<div className='mid_1-1'>
					<div className='minibox'>
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

			<section
				className='mid_2'
				style={{
					opacity: mid2Opacity,
					transform: mid2Opacity === 0 ? 'translateY(150px)' : 'translateY(0)', // 아래에서 위로 올라오는 효과
					transition: 'opacity 3s ease, transform 3s ease'
				}}>
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
				<div
					className='combineImg'
					ref={combinImgRef}
					onMouseEnter={() => combinImgRef.current.classList.add('on')}
					onMouseLeave={() => combinImgRef.current.classList.remove('on')}>
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
						<ButtonPath />
					</div>
				</div>
			</section>
		</main>
	);
}
