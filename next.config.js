module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/parking-lot',
				permanent: true,
			},
		];
	},
};
