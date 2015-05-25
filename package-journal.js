// Package metadata file for Meteor.js. Maintainer: @dandv.
'use strict';

var packageName = 'bootswatch:journal';  // https://atmospherejs.com/bootswatch/journal
var gitHubPath = 'thomaspark/bootswatch';  // https://github.com/thomaspark/bootswatch
var npmPackageName = 'bootswatch';  // https://www.npmjs.com/package/bootswatch

/* All of the below is just to get the version number of the 3rd party library.
 * First we'll try to read it from a file in the submodule. This works when publishing or testing the package
 * but not when running an example app that uses a local copy of the package because the current
 * directory will be that of the app, not of the wrapper package. Finding the path of a file is hard:
 * http://stackoverflow.com/questions/27435797/how-do-i-obtain-the-path-of-a-file-in-a-meteor-package
 * Therefore, we'll fall back to GitHub, then to NPMJS.
 * We also don't have the HTTP package at this stage, and if we use Package.* in the request() callback,
 * it will error that it must be run in a Fiber. So we'll use Node futures.
 */
var request = Npm.require('request');
var Future = Npm.require('fibers/future');

var fut = new Future;
var version;

try {
    var packageJson = JSON.parse(Npm.require('fs').readFileSync('bootswatch/package.json'));
    version = packageJson.version;
} catch (e) {
    // if the file was not found, fall back to GitHub
    console.warn('Could not find bootswatch/package.json to read version number from; trying GitHub...');
    var url = 'https://api.github.com/repos/' + gitHubPath + '/tags';
    request.get({
        url: url,
        headers: {
            'User-Agent': 'request'  // GitHub requires it
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var versions = JSON.parse(body).map(function (version) {
                return version['name'];
            }).sort();
            fut.return(versions[versions.length - 1]);
        } else {
            // GitHub API rate limit reached? Fall back to npmjs.
            console.warn('GitHub request to', url, 'failed:\n ', response && response.statusCode, response && response.body, error || '', '\nTrying NPMJS...');
            url = 'http://registry.npmjs.org/' + npmPackageName + '/latest';
            request.get(url, function (error, response, body) {
                if (!error && response.statusCode === 200)
                    fut.return(JSON.parse(body).version);
                else
                    fut.throw('Could not get version information from ' + url + ' either (incorrect package name?):\n' + (response && response.statusCode || '') + (response && response.body || '') + (error || ''));
            });
        }
    });

    version = fut.wait();
}

version = version
    .replace(/^\D+/, '')  // trim leading non-digits
    .replace('+', '_');  // replace '+' with '_', e.g. for https://github.com/thomaspark/bootswatch/releases/tag/v3.3.4%2B1

// Now that we finally have an accurate version number...
Package.describe({
    name: packageName,
    summary: 'Bootswatch Journal skin for Bootstrap',
    version: version,
    git: 'https://github.com/MeteorPackaging/bootswatch',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.addFiles('bootswatch/journal/bootstrap.css', 'client');
});
