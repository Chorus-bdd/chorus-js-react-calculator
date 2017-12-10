## Chorus React-Redux Calculator

A sample project which demonstrates how Chorus can be used to test a React / Redux APP

The Chorus test interpreter is a Java project, and you will need Java version 8+ to run it
You can find out which version of Java you have by opening up a shell and typing 'java -v' at the command line

The other dependency is `Chrome Driver`, since the Chrous interpreter uses Selenium to open up Chrome, and navigate the browser to the correct page

The Chorus interpreter itself has been packaged as a tar.gz, and once installed/unzipped can be invoked using a command line script, 

These then are the steps require to set everything up:
 
 * Ensure you have Java 8+ available (java -v)
 * Download the latest Chorus release from the Chorus interpreter's github repo at [https://github.com/Chorus-bdd/Chorus/releases]
 * Unzip it and add the unzipped folder, which contains the script chorus.sh, to your system PATH
 * Make sure Chrome Driver is dowloaded and also on your PATH - you can find it at [https://sites.google.com/a/chromium.org/chromedriver/]

Once this is done you can  navigate to the place you checked out this project and run the tests with the command: 

`chorus -f ./features`


