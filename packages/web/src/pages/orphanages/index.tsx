import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSun, FiMoon } from 'react-icons/fi';
import { TileLayer } from 'react-leaflet';
import { useTheme } from '../../contexts/themes';

import 'leaflet/dist/leaflet.css';

import { Container, Maps } from './styles';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

function OrphanagesMap() {
	const { ToggleTheme, theme } = useTheme();

	return (
		<Container>
			<aside>
				<header>
					{theme.title === 'light' ? (
						<img src={mapMarkerLight} alt="Happy" />
					) : (
						<img src={mapMarkerDark} alt="Happy" />
					)}

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<div className="location">
						<strong>Medianeira</strong>
						<span>Paraná</span>
					</div>
					<button type="button" onClick={ToggleTheme}>
						{theme.title === 'light' ? (
							<FiMoon size={32} color="#fff" />
						) : (
							<FiSun size={32} color="#fff" />
						)}
					</button>
				</footer>
			</aside>

			<Maps center={[-25.295, -54.095]} zoom={16.4}>
				<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			</Maps>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</Container>
	);
}

export default OrphanagesMap;
