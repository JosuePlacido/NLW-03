import React, {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import Leaflet, { LeafletMouseEvent } from 'leaflet';
import { useTheme } from '../../contexts/themes';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

import SideBar from '../../components/sidebar';
import api from '@nlw03/axios-config';
import { Container, Form } from './styles';

export default function CreateOrphanage() {
	const history = useHistory();
	const { theme } = useTheme();
	const [coord, setCoord] = useState({ latitude: 0, longitude: 0 });
	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	const [name, setName] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [about, setAbout] = useState('');
	const [instructions, setInstructions] = useState('');
	const [opening_hours, setOpeningHours] = useState('');
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				setCoord({ latitude, longitude });
			},
			err => {
				console.log(err);
			},
			{
				timeout: 30000
			}
		);
	}, []);
	const handleMapClick = useCallback((event: LeafletMouseEvent) => {
		const { lat, lng } = event.latlng;
		setPosition({
			latitude: lat,
			longitude: lng
		});
	}, []);

	const handleSelectImages = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files) {
				return;
			}

			const selectedImages = Array.from(event.target.files);

			setImages(selectedImages);

			const selectedImagesPreview = selectedImages.map(image =>
				URL.createObjectURL(image)
			);

			setPreviewImages(selectedImagesPreview);
		},
		[]
	);

	const handleSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();

			const data = new FormData();

			data.append('name', name);
			data.append('latitude', String(position.latitude));
			data.append('longitude', String(position.longitude));
			data.append('about', about);
			data.append('instructions', instructions);
			data.append('opening_hours', opening_hours);
			data.append('open_on_weekends', String(open_on_weekends));
			images.forEach(image => {
				data.append('images', image);
			});

			api.post('/orphanages', data).then(response => {
				alert('Cadastro realizado com sucesso !');
				history.push('/app');
			});
		},
		[
			about,
			history,
			images,
			instructions,
			name,
			open_on_weekends,
			opening_hours,
			position.latitude,
			position.longitude
		]
	);

	const mapIcon = useMemo(
		() =>
			Leaflet.icon({
				iconUrl:
					theme.title === 'light' ? mapMarkerLight : mapMarkerDark,

				iconSize: [58, 68],
				iconAnchor: [29, 68],
				popupAnchor: [170, 2]
			}),
		[theme]
	);

	return (
		<Container>
			<SideBar />

			<main>
				<Form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[coord.latitude, coord.longitude]}
							style={{ width: '100%', height: 280 }}
							zoom={15}
							onClick={handleMapClick}
						>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
							/>

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={mapIcon}
									position={[
										position.latitude,
										position.longitude
									]}
								/>
							)}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input
								id="name"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
							<textarea
								id="name"
								maxLength={300}
								value={about}
								onChange={e => setAbout(e.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">
								{previewImages.map(image => (
									<img src={image} key={image} alt={name} />
								))}

								<label htmlFor="images[]" className="new-image">
									<FiPlus size={24} />
								</label>
							</div>

							<input
								multiple
								onChange={handleSelectImages}
								type="file"
								id="images[]"
							/>
						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea
								id="instructions"
								value={instructions}
								onChange={e => setInstructions(e.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">
								Horário de funcionamento
							</label>
							<input
								id="opening_hours"
								value={opening_hours}
								onChange={e => setOpeningHours(e.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">
								Atende fim de semana
							</label>

							<div className="button-select">
								<button
									type="button"
									className={open_on_weekends ? 'active' : ''}
									onClick={() => {
										setOpenOnWeekends(true);
									}}
								>
									Sim
								</button>
								<button
									type="button"
									className={
										!open_on_weekends ? 'active' : ''
									}
									onClick={() => {
										setOpenOnWeekends(false);
									}}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</Form>
			</main>
		</Container>
	);
}
