import { useNavigate } from 'react-router-dom';

// imformation - Product videos - youtube
export default function ButtonPath() {
	const navigate = useNavigate();

	// 버튼 정보 배열
	const buttons = [
		{ label: 'Gallery', path: '/gallery' },
		{ label: 'Youtube', path: '/youtube' }
	];

	return (
		<div>
			{/* 버튼 생성 */}
			{buttons.map((button, index) => (
				<button key={index} onClick={() => navigate(button.path)}>
					{button.label}
				</button>
			))}
		</div>
	);
}
