module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [
		'./components/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
                dark_jungle_green: '#171C1A',
                black_coffee: '#403A42',
                xanadu: '#71827B',
                light_gray: '#CDCED4',
                ghost_white: '#F4F1F6',
			},
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};
