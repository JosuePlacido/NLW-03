import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { useTheme } from './contexts/themes';

import light from './styles/themes/default';

import Landing from './pages/landing';
import OrphanagesMap from './pages/orphanages';

function Routes() {
	const { theme } = useTheme();

	return (
		<ThemeProvider theme={theme ? theme : light}>
			<GlobalStyle />
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Landing} />
					<Route path="/app" component={OrphanagesMap} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default Routes;
