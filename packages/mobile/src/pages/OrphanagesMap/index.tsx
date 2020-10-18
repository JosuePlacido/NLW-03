import React, { useCallback, useEffect, useState } from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../../images/mapMarker.png';
import {
	Container,
	Map,
	CalloutContainer,
	CalloutText,
	Footer,
	FooterText,
	Button
} from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '@nlw03/axios-config';
import * as Location from 'expo-location';

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

const OrphanagesMap: React.FC = () => {
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	}>({
		latitude: -25.293443,
		longitude: -54.0942733,
		latitudeDelta: 0.008,
		longitudeDelta: 0.008
	});
	const [orphanages, setOrphanges] = useState<Orphanage[]>([]);
	const navigation = useNavigation();
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({});
				setLocation({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				});
			}
		})();
	}, []);
	useFocusEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanges(response.data);
		});
	});

	function handleNavigateToOrphanageDetails(id: number) {
		navigation.navigate('OrphanageDetails', { id });
	}
	const handleNavigateToCreateOrphanage = useCallback(() => {
		navigation.navigate('SelectMapPosition');
	}, []);

	return (
		<Container>
			<Map provider={PROVIDER_GOOGLE} initialRegion={location}>
				{orphanages.map(orphanage => {
					return (
						<Marker
							key={orphanage.id}
							icon={mapMarker}
							calloutAnchor={{
								x: 2.7,
								y: 0.8
							}}
							coordinate={{
								latitude: orphanage.latitude,
								longitude: orphanage.longitude
							}}
						>
							<Callout
								tooltip
								onPress={() =>
									handleNavigateToOrphanageDetails(
										orphanage.id
									)
								}
							>
								<CalloutContainer>
									<CalloutText>{orphanage.name}</CalloutText>
								</CalloutContainer>
							</Callout>
						</Marker>
					);
				})}
			</Map>

			<Footer>
				<FooterText>
					{orphanages.length} orfanatos encontrados
				</FooterText>
				<Button onPress={handleNavigateToCreateOrphanage}>
					<Feather name="plus" size={20} color="#fff" />
				</Button>
			</Footer>
		</Container>
	);
};

export default OrphanagesMap;
