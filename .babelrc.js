module.exports = {
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react", 
		"@babel/preset-flow"
	],
	"plugins": [
		"react-hot-loader/babel",
		[
			"@babel/plugin-transform-runtime",
			{
				regenerator: true
			}
		]
	]
};
