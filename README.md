[![Build Status](https://github.com/openmrs/openmrs-owa-orderentry/actions/workflows/build-latest.yml/badge.svg)](https://github.com/openmrs/openmrs-owa-orderentry/actions/workflows/build-latest.yml)
[![Coverage Status](https://coveralls.io/repos/github/openmrs/openmrs-owa-orderentry/badge.svg?branch=master)](https://coveralls.io/github/openmrs/openmrs-owa-orderentry?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0ca12a1ce3d64c76a84924e186ea4893)](https://www.codacy.com/app/openmrs/openmrs-owa-orderentry?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=openmrs/openmrs-owa-orderentry&amp;utm_campaign=Badge_Grade)

<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# openmrs-owa-orderentry

This repository contains the openmrs-owa-orderentry OpenMRS Open Web App.

> The OpenMRS Order Entry UI is an application to support (drug) orders through UI
For further documentation about OpenMRS Open Web Apps see
[Open Web App Wiki](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module)
[Order Entry UI OWA wiki](https://wiki.openmrs.org/display/projects/Order+Entry+UI+End+User+Guide?src=contextnavchildmode).

## Development

### Local setup instructions

### Get the project
```
git clone https://github.com/openmrs/openmrs-owa-orderentry.git
```
### Move into the project directory
```
cd into openmrs-owa-orderentry
```
### Install the dependencies
```
npm install
```
### Create config.json

Create a `config.json` file in the top level directory following this template:
```
{
    'LOCAL_OWA_FOLDER': '/Users/name/openmrs-standalone-2.4/appdata/owa/',
    'APP_ENTRY_POINT': 'http://localhost:8081/openmrs-standalone/owa/orderentry/index.html'
}
```
`LOCAL_OWA_FOLDER` should point to the `owa` directory of your locally running OpenMRS instance, and
`APP_ENTRY_POINT` should point to the entry point of your app

## Linux/SDK example

For example in a link environment where I have OpenMRS running on port `8080` via the SDK in
directory `/home/mgoodrich/openmrs/haiti`, I set `config.json` as follows:
```
{"LOCAL_OWA_FOLDER":"/home/mgoodrich/openmrs/haiti/owa",
"APP_ENTRY_POINT":"http://localhost:8080/openmrs/owa/openmrs-owa-orderentry/index.html"}
```
## Windows/Standalone example

Locate the `appdata/owa` directory and type the following command to get the path to the `appdata/owa` directory and copy it to the clipboard.
```
pwd | pbcopy
```
An example of the path is: `/Users/name/downloads/openmrs-owa-orderentry/appdata\owa`

Modify the path to look like: `/Users/name/downloads/openmrs-owa-orderentry/appdata\\owa/`

Copy the path. Edit `config.json` as follows:
```
{
  "LOCAL_OWA_FOLDER": "PASTE_THE_PATH_YOU_COPIED_HERE",
  "APP_ENTRY_POINT": "http://localhost:8081/openmrs-standalone/owa/openmrs-owa-orderentry/index.html"
}
```
Note: Start your cohort builder standalone server locally. Make sure you tomcat port is `8081`, if not, change the `APP_ENTRY_POINT` localhost port to be the same as your tomcat port.

# Run the app
```
npm run watch
```
### Production Build

You will need NodeJS 6+ installed to do this. See the install instructions [here](https://nodejs.org/en/download/package-manager/).

Once you have NodeJS installed, install the dependencies (first time only):

```
npm install
```

Build the distributable using [Webpack](https://webpack.github.io/) as follows:

````
npm run build:prod
````

This will create a file called `openmrs-owa-orderentry.zip` file in the root directory,
which can be uploaded to the OpenMRS Open Web Apps module.

### Local Deploy

To deploy directly to your local Open Web Apps directory, run:

````
npm run build:deploy
````

This will build and deploy the app to the `/Users/name/openmrs-standalone-2.4/appdata/owa` directory.  
To change the deploy directory, edit the `LOCAL_OWA_FOLDER` entry in `config.json`. 
If this file does not exists, create one in the root directory that looks like:

```js
{
  "LOCAL_OWA_FOLDER": "/Users/name/openmrs-standalone-2.4/appdata/owa"
}
```
Note: This could be different depending on your installed version and install location.

### Live Reload

To use [Browersync](https://www.browsersync.io/) to watch your files and reload
the page, inject CSS or synchronize user actions across browser instances, you will need the `APP_ENTRY_POINT` entry in your `config.json` file:

```js
{
  "LOCAL_OWA_FOLDER": "/Users/name/openmrs-standalone-2.4/appdata/owa",
  "APP_ENTRY_POINT": "http://localhost:8081/openmrs-standalone/owa/openmrs-owa-orderentry/index.html"
}
```
Run Browsersync as follows:

```
npm run watch
```

### Extending

Install [npm](http://npmjs.com/) packages dependencies as follows:

````
npm install --save <package>
````

To use the installed package, import it as follows:

````js
//import and assign to variable
import variableName from 'package';
````

To contain package in vendor bundle, remember to add it to vendor entry point array, eg.:

````js
entry: {
  app : `${__dirname}/app/js/owa.js`,
  css: `${__dirname}/app/css/owa.css`,
  vendor : [
    'package',
    ...//other packages in vendor bundle
  ]
},
````

Any files that you add manually must be added in the `app` directory.

### Troubleshooting

##### [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

You may experience problems due to the `Access-Control-Allow-Origin` header not
being set by OpenMRS. To fix this you'll need to enable Cross-Origin Resource
Sharing in Tomcat.

See instructions [here](http://enable-cors.org/server_tomcat.html) for Tomcat 7 and [here](https://www.dforge.net/2013/09/16/enabling-cors-on-apache-tomcat-6/) for Tomcat 6.

## Usage
Before using the Order Entry Open Web Application, the administrator should make the following one time configurations using the admin portal.
1. Create an Encounter Type called `Order Entry` or any other name.
2. Create a setting `orderentryowa.encounterType` whose value should correspond to the name given to the Encounter Type created above.
3. Create an Encounter Role called `Clinician` or any other name.
4. Create a setting `orderentryowa.encounterRole` whose value should correspond to the name given to the encounter role created in 3 above.
5. Create a date format, setting `orderentryowa.dateAndTimeFormat` as the name, with a value of the date format, e.g. `DD-MMM-YYYY HH:mm`, in the global properties
6. Add global property `orderentryowa.labOrderAutoExpireTimeInDays` with a value of `30` days or any other number
7. Add global propery Lab Orderables Concept Set `orderentryowa.abOrderablesConceptSet`, whose value is the UUID of a concept set of Class LabSet and whose Set Members are other LabSet concept sets or concept of Class Test.


**NB:** Not having any of the above configurations will result into an error notice. Please check more information [here](https://wiki.openmrs.org/display/projects/Order+Entry+UI+Administrator+Guide)

## Releasing

Releasing is done via Github Releases.  The process is as follows:

1. Update the version number in package.json, pom.xml, and app/manifest.webapp by removing the "-SNAPSHOT" in each.  Ensure all 3 versions match.
2. Commit and push to master and confirm everything builds successfully in Github Actions
3. Go to the [Releases Page](https://github.com/openmrs/openmrs-owa-orderentry/releases) and create a new release named after the version you want to release, publish this.
4. Confirm that the [Deploy release](https://github.com/openmrs/openmrs-owa-orderentry/actions/workflows/release.yml) job completes successfully
5. Confirm that the zip artifact has been successfully published to the [Maven repository](https://openmrs.jfrog.io/ui/repos/tree/General/owa%2Forg%2Fopenmrs%2Fowa%2Forderentry)   
6. Update the version number in package.json, pom.xml, and app/manifest.webapp, by incrementing to the next version number and adding a "-SNAPSHOT" suffix
7. Commit and push to master, and confirm that the next SNAPSHOT builds successfully

NOTE: Travis CI will build the project using the version of react-components specified in the package.json, while the 
PIH staging build always uses the latest head of react-components when building and deploying order entry. 
Therefore, if changes have been made to react-components since the last ordery entry release, you will likely want to 
release react-components (see react-components README for details) and upgrade the version number in the Order Entry 
package.json before releasing Lab Workflow or you may inadvertently release Order Entry with an earlier verison of 
React Components than you have been testing against.

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
