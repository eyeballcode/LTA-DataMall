module.exports = () => {
	return JSON.parse(require('fs').readFileSync('./config.json')).accountKey
}
