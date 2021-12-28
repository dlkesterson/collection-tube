module.exports = {
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};

		return config;
	},
	webpack5: true,
	// webpack: (config) => {
	// 	config.resolve.fallback = { fs: false };

	// 	return config;
	// },
};
