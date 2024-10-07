import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	console.log(Flickr);

	useEffect(() => {
		const method = 'flickr.people.getPhotos';
		const flickr_api = '21e294ad0ec03a32d7355980457d9e11';
		const myID = '197119297@N02';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	return (
		<Layout title={'GALLERY'}>
			<section className='galleryList'>
				{Flickr.map((data, idx) => {
					return (
						<article key={idx}>
							<img
								src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
								alt={data.title}
							/>
							<h3>{data.title}</h3>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
