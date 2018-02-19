
import createClient from 'chorus-js';

const client = createClient('CalculatorStepPublisher', 'A simple chorus step publisher');
export default client;

const urlParams = new URLSearchParams(window.location.search);
const chorusHostAndPort = urlParams.get('chorusHostAndPort');

export const clientOpened = chorusHostAndPort ?
    client
        .open(`ws://${chorusHostAndPort}`)
        .then(() => client.connect()) :
    new Promise(() => {});