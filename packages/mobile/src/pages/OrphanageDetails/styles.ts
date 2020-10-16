import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions } from 'react-native';

export const Container = styled.ScrollView`
    flex: 1;
`;
export const ImagesContainer = styled.View`
    height: 240px;
`;/*
export const Image = styled.Image`
    width: Dimensions.get('window').width;
    height: 240px;
    resize-mode: cover;
`;*/
export const DetailsContainer= styled.View`
	padding: 24px;
`;
export const Title = styled.Text`
	color:#4D6F80;
	font-size:30px;
	font-family: Nunito_700Bold;
`;

export const Description = styled.Text`
    font-family: Nunito_600SemiBold;
    color: #5c8599;
    line-height: 24px;
    margin-top: 16px;
`;

export const MapContainer = styled.View`
    border-radius: 20px;
    overflow: hidden;
    border-width: 1.2px;
    border-color: #B3DAE2;
    margin-top: 40px;
    background-color: #E6F7FB;
`;

export const MapStyle = styled(MapView)`
    width: 100%;
    height: 150px;
`;
export const RoutesContainer = styled.View`
    padding: 16px;
    align-items: center;
    justify-content: center;
`;

export const RoutesText = styled.Text`
    font-family: Nunito_700Bold;
    color: #0089a5;
`;
export const Separator = styled.View`
    height: 0.8px;
    width: 100%;
    background-color: #D3E2E6;
    margin: 40px 0;
`;

export const ScheduleContainer = styled.View`
    margin-top: 24px;
    flex-direction: row;
	justify-content: space-between;
`;

interface ScheduleItemProps {
	color:string;
	backgroundColor:string;
}
interface ScheduleItemTextProps {
	color:string;
}
export const ScheduleItem = styled.View<ScheduleItemProps>`
    width: 48%;
    padding: 20px;
	border-width:1px;
	border-radius: 20px;
    background-color:  ${props => props.backgroundColor || '#E6F7FB'};
    border-color: ${props => props.backgroundColor || '#B3DAE2'};
`;

export const ScheduleText = styled.Text<ScheduleItemTextProps>`
    font-family: Nunito_600SemiBold;
    font-size: 16px;
    line-height: 24px;
    margin-top: 20px;
	color: ${props => props.color};
`;

export const ContactButton = styled(RectButton)`
    background-color: #3CDC8C;
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 56px;
    margin-top: 40px;
`;

export const ContactText = styled.Text`
    font-family: Nunito_800ExtraBold;
    color: #FFF;
    font-size: 16px;
    margin-left: 16px;
`;

export const ImageStyled = styled.Image`
    width: ${Dimensions.get('window').width}px;
    height: 240px;
    resize-mode: cover;
`;
