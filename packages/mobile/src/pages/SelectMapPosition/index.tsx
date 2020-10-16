import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/mapMarker.png';
import styles, { Container, NextButton, NextText } from './styles';

export default function SelectMapPosition() {
	const navigation = useNavigation();
	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	function handleNextStep() {
		navigation.navigate('OrphanageData', { position });
	}

	function handleSelectMapPosition(event: MapEvent) {
		setPosition(event.nativeEvent.coordinate);
	}

	return (
		<Container>
			<MapView
				initialRegion={{
					latitude: -25.293443,
					longitude: -54.0942733,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
				style={styles.mapStyle}
				onPress={handleSelectMapPosition}
			>
				<Marker
					icon={mapMarkerImg}
					coordinate={{
						latitude: position.latitude,
						longitude: position.longitude
					}}
				/>
			</MapView>

			{position.latitude !== 0 && (
				<NextButton onPress={handleNextStep}>
					<NextText>Próximo</NextText>
				</NextButton>
			)}
		</Container>
	);
}
