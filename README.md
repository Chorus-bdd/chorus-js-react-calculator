[![Build Status](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator.svg?branch=master)](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator)

## Chorus React-Redux Calculator

A sample project which demonstrates how the Docker version of Chorus interpreter can be used to test a React / Redux APP running under Docker compose

### Building and Running the calculator app locally

You will need: 

1. Yarn and Node.js installed to build and run the web app locally
2. Docker and Docker Compose, to run the e2e tests

To install and run the app:

* `yarn install`

Once installed you can start it with

* `yarn start`

And open a browser at localhost:3000

Although you can run the app locally like this, for e2e testing a docker-compose.yml is included under ./e2e which will start up the 
app in a Docker container node image, and start up a Chorus and Selenium containers alongside it to test it.

### Running the e2e test suite with Chorus Docker 

Running Chorus under Docker prevents you having to install Chorus (and Java) locally on your system :)

A docker-compose.yml is included under ./e2e which includes images for 

* Selenium Hub, Firefox and Chrome.
* node - to serve the html and js resources for the Calculator single page app
* chorus-interpreter - to run the chorus tests under ./feature, using Selenium

You can run the e2e Chorus features with:

* `yarn e2e`

This will run the script under e2e/e2e.sh, which starts up the docker cluster and runs all the tests under ./feature
This will start all the containers once and run the test


### Watching the tests running

Since the Selenium Chrome image has VNC enabled, you can see the chorus tests running in the browser by pointing a VNC client at `vnc://localhost:5912`, using pwd `secret`   
This will attach to a vnc server on the docker image running the chrome browser
Tip - On MacOS, Safari will work :) 

You can also connect to the calculator app running in the node container by pointing your browser at `http://localhost:9000`


### Running tests while developing

To work on new tests, you can bring up the environment by running 

* `yarn e2e:start`

And once the docker environment has started, you can execute chorus features manually by typing

* `yarn e2e:runChorus`

This command will exec the Chorus interpreter once, within the Chorus container.


![Running](https://github.com/Chorus-bdd/chorus-js-react-calculator/blob/master/runningTheInterpreter.png)


#### Acknowledgements

Thanks to Michael Jackson for open sourcing the original HTML5/CSS Calculator on which this Redux / Chorus conversion was based 
https://codepen.io/mjijackson/pen/xOzyGX

