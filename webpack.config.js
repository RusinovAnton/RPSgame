module.exports = {
	cache: false,
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'app.js'
	}
};