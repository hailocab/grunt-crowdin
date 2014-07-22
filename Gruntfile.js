'use strict';

var fs = require('fs');
var express = require('express');

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['tmp']
        },

        // Local
        crowdin: {
            default: {
                options: {
                    apiKey: '12345',
                    // Must match the URL in the `testserver` task
                    endpointUrl: 'http://localhost:9999/test',
                    extract: 'tmp/i18n',
                    writeConfig: 'tmp/config.json'
                }
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Run a server to simulate Crowdin in order to download a ZIP
    grunt.registerTask('testserver', function() {
        var done = this.async();
        var app = express();

        app.get('/test/download/all.zip', function(req, res) {
            fs.createReadStream(__dirname + '/test/all.zip').pipe(res);
        });
        app.listen(9999, done);
    });

    grunt.registerTask('test', ['clean', 'testserver', 'crowdin', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

};
