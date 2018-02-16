[![Build Status](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator.svg?branch=master)](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator)

## Chorus React-Redux Calculator

A sample project which demonstrates how Chorus 3.0.x can be used to test a React / Redux APP

*Chorus 3.0.x is an early access build, there may be changes before the official 3.0.0 release* 

### Building and Running the calculator app

You will need yarn and node installed to build the web app locally

* `yarn install`

Once installed you can start it with

* `yarn start`

And open a browser at localhost:3000

### Running tests with Chorus 

The Chorus interpreter is packaged as a Docker image and the tests are run with `docker-compose`
This prevents you having to install Chorus (and Java) locally, and the only dependency is Docker :)

A docker-compose.yml is included under ./e2e which includes images for 

* Selenium Hub, Firefox and Chrome.
* node - to serve the html and js resources for the Calculator single page app
* chorus-interpreter - to run the chorus tests under ./feature, using Selenium

Once you have docker installed and working, then you can run the Chorus features with:

* `yarn e2e`

This will run the script under e2e/e2e.sh, which starts up the docker cluster - and the Chorus image will run all the feature files under ./feature

You can see the chorus tests running in the browser by pointing a VNC client at `vnc://localhost:5912`, using pwd `secret` 

This will attach to a vnc server on the docker image running the chrome browser
Tip - On MacOS, Safari will work :) 


[[https://github.com/Chorus-bdd/chorus-js-react-calculator/blob/master/runningTheInterpreter.png|alt=runningImage]]


#### Acknowledgements

Thanks to Michael Jackson for open sourcing the original HTML5/CSS Calculator on which this Redux / Chorus conversion was based 
https://codepen.io/mjijackson/pen/xOzyGX

