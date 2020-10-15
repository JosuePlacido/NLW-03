import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { useTheme } from './contexts/themes';
import 'leaflet/dist/leaflet.css';

import light from './styles/themes/default';

import Landing from './pages/landing';
import OrphanagesMap from './pages/orphanages';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
	const { theme } = useTheme();

	return (
		<ThemeProvider theme={theme ? theme : light}>
			<GlobalStyle />
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Landing} />
					<Route path="/app" component={OrphanagesMap} />
					<Route
						path="/orphanage/create"
						component={CreateOrphanage}
					/>
					<Route path="/orphanage/:id" component={Orphanage} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default Routes;
