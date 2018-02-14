
import createClient from 'chorus-js';

const client = createClient('CalculatorStepPublisher', 'A simple chorus step publisher');
export default client;

var urlParams = new URLSearchParams(window.location.search);
var chorusHostAndPort = urlParams.get('chorusHostAndPort');

export const clientOpened =
	client
		.open('ws://' + chorusHostAndPort)
		.then(() => client.connect());
