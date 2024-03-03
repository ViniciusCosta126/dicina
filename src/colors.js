export const pallets = [
	{ label: 'Cores da Marca', value: 'colorsPrimary' },
	{ label: 'Cores Secundárias', value: 'colorsSecondary' },
	{ label: 'Cores de Superfície', value: 'colorsSurface' },
	{ label: 'Cores de Texto', value: 'colorsText' },
	{ label: 'Status', value: 'colorsStatus' },
	{ label: 'Gradientes', value: 'colorsGradients' },
];

export const colors = {
	colorsPrimary: [
		{ name: 'Azul Escuro', color: '#002753' },
		{ name: 'Azul', color: '#1832D7' },
		{ name: 'Verde escuro', color: '#00713B' },
		{ name: 'Verde Claro', color: '#00A851' },
		{ name: 'Azul Marinho', color: '#000974' },
		{ name: 'Amarelo', color: '#EBC535' },
		{ name: 'Amarelo Claro', color: '#EFD936' },
		{ name: 'Preto', color: '#000000' },
		{ name: 'Branco', color: '#ffffff' },
	],

	colorsSecondary: [
		{ name: 'Preto', color: '#121212' },
		{ name: 'Cinza Escuro', color: '#43485C' },
		{ name: 'Cinza Médio', color: '#757580' },
		{ name: 'Cinza Claro', color: '#A2A1A8' },
		{ name: 'Branco', color: '#FFFFFF' },
	],

	colorsText: [
		{ name: 'Preto', color: '#191919' },
		{ name: 'Branco', color: '#FFFFFF' },
	],

	colorsSurface: [
		{ name: 'Superfície Primária', color: '#6D6E71' },
		{ name: 'Superfície Secundária', color: '#808285' },
		{ name: 'Superfície Terciária', color: '#939598' },
		{ name: 'Superfície Quaternária', color: '#BCBEC0' },
	],

	colorsStatus: [
		{ name: 'Error', color: '#ec1c24' },
		{ name: 'Validation', color: '#ffb82e' },
		{ name: 'Sucess', color: '#8bc53f' },
		{ name: 'Desabilit', color: '#d0d0d0' },
	],

	colorsGradients: [
		{ name: 'Azul-Verde', gradient: 'linear-gradient(90deg, #002753 0%, #00A851 100%)' },
		{ name: 'Azul-Amarelo', gradient: 'linear-gradient(90deg, #002753 7.81%, #EFD936 100%)' },
		{ name: 'Verde-Azul', gradient: 'linear-gradient(90deg, #00A851 0%, #1832D7 100%)' },
		{ name: 'Hover de Botão', gradient: 'linear-gradient(90deg, #002753 0%, #EBC535 100%)' },
		{
			name: 'Gradiente de texto',
			gradient: 'linear-gradient(180deg, rgba(0, 39, 83, 0) 0%, rgba(0, 39, 83, 0.412371) 20.83%, #002753 50.52%)',
		},
		{
			name: 'Linear 6',
			gradient:
				'linear-gradient(90deg, #E4CE36 0%, #E0CB39 13.21%, #BCB152 26.23%, #7A8381 50.19%, #3551B2 75.19%, #0A33D0 98.96%)',
		},
		{
			name: 'Amarelo-Azul',
			gradient: 'linear-gradient(270deg, #002753 11.46%, #697546 63.02%, #EFD936 100%)',
		},
		{
			name: 'Gradiente',
			gradient: 'linear-gradient(180deg, #002753 0%, #00713B 26.56%, #000974 50.52%, #EFD936 76.04%, #EBC535 100%)',
		},
		{
			name: 'Preto-Radial',
			gradient: 'radial-gradient(50% 50% at 50% 50%, rgba(18, 18, 18, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%)',
		},
		{
			name: 'Azul-Transparent',
			gradient: 'linear-gradient(to right, #002753 0, #002753 75%, rgba(0,39,83, 0.7) 90%, transparent 100%)',
		},
	],
};
