import React, { useState } from 'react';
import api from '@nlw03/axios-config';
import {
	ScrollView,
	View,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {
	Container,
	Input,
	Label,
	NextButton,
	SwitchContainer,
	Title,
	NextText,
	UploadedImagesContainer,
	UploadedImage,
	ImagesInput
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImagePicker } from 'expo';

interface OrphanageDataRouteParams {
	position: {
		latitude: number;
		longitude: number;
	};
}
export default function OrphanageData() {
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const [instructions, setInstructions] = useState('');
	const [opening_hours, setOpeningHours] = useState('');
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<string[]>([]);

	const navigation = useNavigation();
	const route = useRoute();
	const params = route.params as OrphanageDataRouteParams;

	async function handleCreateOrphanage() {
		const { latitude, longitude } = params.position;

		console.log({
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends
		});

		const data = new FormData();

		data.append('name', name);
		data.append('about', about);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('instructions', instructions);
		data.append('opening_hours', opening_hours);
		data.append('open_on_weekends', String(open_on_weekends));
		images.forEach((image, index) => {
			data.append('images', {
				name: `image_${index}.jpg`,
				type: 'image/jpg',
				uri: image
			} as any);
		});

		await api.post('orphanages', data);

		navigation.navigate('OrphanagesMap');
	}
	async function handleSelectImages() {
		const {
			status
		} = await ImagePicker.requestCameraRollPermissionsAsync();

		if (status !== 'granted') {
			alert('Eita, precisamos de acesso às suas fotos.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
			mediaTypes: ImagePicker.MediaTypeOptions.Images
		});

		if (result.cancelled) {
			return;
		}

		const { uri: image } = result;

		setImages([...images, image]);
	}
	return (
		<Container contentContainerStyle={{ padding: 24 }}>
			<Title>Dados</Title>

			<Label>Nome</Label>
			<Input value={name} onChangeText={text => setName(text)} />

			<Label>Sobre</Label>
			<Input
				style={{ height: 110 }}
				multiline
				value={about}
				onChangeText={text => setAbout(text)}
			/>
			{/* <Label>Whatsapp</Label>
			<Input
				value={whatsapp}
				onChangeText={text => setWhatsapp(text)}/> */}

			<Label>Fotos</Label>
			<UploadedImagesContainer>
				{images.map(image => {
					return (
						<UploadedImage key={image} source={{ uri: image }} />
					);
				})}
			</UploadedImagesContainer>
			<ImagesInput onPress={handleSelectImages}>
				<Feather name="plus" size={24} color="#15B6D6" />
			</ImagesInput>

			<Title>Visitação</Title>

			<Label>Instruções</Label>
			<Input
				style={{ height: 110 }}
				multiline
				value={instructions}
				onChangeText={text => setInstructions(text)}
			/>

			<Label>Horario de visitas</Label>
			<Input
				value={opening_hours}
				onChangeText={text => setOpeningHours(text)}
			/>

			<SwitchContainer>
				<Label>Atende final de semana?</Label>
				<Switch
					thumbColor="#fff"
					trackColor={{ false: '#ccc', true: '#39CC83' }}
					value={open_on_weekends}
					onValueChange={text => setOpenOnWeekends(text)}
				/>
			</SwitchContainer>

			<NextButton onPress={handleCreateOrphanage}>
				<NextText>Cadastrar</NextText>
			</NextButton>
		</Container>
	);
}
