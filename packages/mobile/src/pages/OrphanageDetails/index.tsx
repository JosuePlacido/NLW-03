import React, { useEffect, useState } from 'react';
import {
	Image,
	View,
	ScrollView,
	Text,
	StyleSheet,
	Dimensions,
	Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import api from '@nlw03/axios-config';
import styles, {
	ContactButton,
	ContactText,
	Container,
	Description,
	DetailsContainer,
	ImagesContainer,
	ImageStyled,
	MapContainer,
	MapStyle,
	RoutesContainer,
	RoutesText,
	ScheduleContainer,
	ScheduleItem,
	ScheduleText,
	Separator,
	Title
} from './styles';
import mapMarkerImg from '../../images/mapMarker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

interface OrphanageDetailsRouteParams {
	id: number;
}

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	about: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: boolean;
	images: Array<{
		id: number;
		url: string;
	}>;
}
export default function OrphanageDetails() {
	const route = useRoute();
	const [orphanage, setOrphanage] = useState<Orphanage>();
	const params = route.params as OrphanageDetailsRouteParams;
	useEffect(() => {
		api.get(`orphanages/${params.id}`).then(response => {
			setOrphanage(response.data);
		});
	}, [params.id]);

	if (!orphanage) {
		return (
			<Container>
				<Description>Carregando...</Description>
			</Container>
		);
	}

	function handleOpenGoogleMapRoutes() {
		Linking.openURL(
			`http://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude}, ${orphanage?.longitude}`
		);
	}
	return (
		<Container>
			<ImagesContainer>
				<ScrollView horizontal pagingEnabled>
					{orphanage.images.map(image => {
						return (
							<ImageStyled
								key={image.id}
								source={{ uri: image.url }}
							/>
						);
					})}
				</ScrollView>
			</ImagesContainer>
			<DetailsContainer>
				<Title>Orf. Esperança</Title>
				<Description>
					Presta assistência a crianças de 06 a 15 anos que se
					encontre em situação de risco e/ou vulnerabilidade social.
				</Description>

				<MapContainer>
					<MapStyle
						initialRegion={{
							latitude: -27.2092052,
							longitude: -49.6401092,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008
						}}
						zoomEnabled={false}
						pitchEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
					>
						<Marker
							icon={mapMarkerImg}
							coordinate={{
								latitude: -27.2092052,
								longitude: -49.6401092
							}}
						/>
					</MapStyle>

					<RoutesContainer>
						<RoutesText>Ver rotas no Google Maps</RoutesText>
					</RoutesContainer>
				</MapContainer>

				<Separator />

				<Title>Instruções para visita</Title>
				<Description>
					Venha como se sentir a vontade e traga muito amor e
					paciência para dar.
				</Description>

				<ScheduleContainer>
					<ScheduleItem backgroundColor="#E6F7FB" color="#B3DAE2">
						<Feather name="clock" size={40} color="#2AB5D1" />
						<ScheduleText color="#5C8599">
							Segunda à Sexta 8h às 18h
						</ScheduleText>
					</ScheduleItem>
					<ScheduleItem backgroundColor="#EDFFF6" color="#A1E9C5">
						<Feather name="info" size={40} color="#39CC83" />
						<ScheduleText color="#37C77F">
							Atendemos fim de semana
						</ScheduleText>
					</ScheduleItem>
				</ScheduleContainer>

				<ContactButton onPress={() => {}}>
					<FontAwesome name="whatsapp" size={24} color="#FFF" />
					<ContactText>Entrar em contato</ContactText>
				</ContactButton>
			</DetailsContainer>
		</Container>
	);
}
