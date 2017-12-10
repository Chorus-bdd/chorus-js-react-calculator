[![Build Status](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator.svg?branch=master)](https://travis-ci.org/Chorus-bdd/chorus-js-react-calculator)

## Chorus React-Redux Calculator

A sample project which demonstrates how Chorus 3.0.x can be used to test a React / Redux APP

*Chorus 3.0.x is an early access build, there may be changes before the official 3.0.0 release* 

You will need **Java version 8+** on your system, in addition to **yarn** and **chromedriver**

The Chorus interpreter has been packaged as a tar.gz, and once installed/unzipped can be invoked from the command line

These are the steps require to set everything up:
 
 * Ensure you have Java 8+ available (java -v to test this)
 * Make sure you have [Chrome Driver](https://sites.google.com/a/chromium.org/chromedriver/) installed
 * Download the latest 3.0.x Chorus tarball from the Chorus interpreter's github repo at [https://github.com/Chorus-bdd/Chorus/releases], unzip it, and add the unzipped folder containing chorus.sh to your system PATH

Once this is done you can  navigate to the place you checked out this project and build and start the web site with the commands:

* yarn install
* yarn test

and in another shell, you can then run the chorus tests from the command line:

* `chorus -f ./features`


Once the above is working, the script ./e2e should also work - this is the automated test which is run using Travis

### Running Chorus tests duing CI/CD

A .travis.yml config and an ./e2e script are provided in the root directory, which provide an example of how you can set up Chorus tests to run in a CI tool such as Travis  
These tests are run after every commit to this Github repo

