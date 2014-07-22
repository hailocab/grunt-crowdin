'use strict';

var chalk = require('chalk');
var forEach = require('lodash.foreach');

var Crowdin = require('crowdin-node');

module.exports = function(grunt) {

    grunt.registerMultiTask('crowdin', 'Download and extract translations from Crowdin', function() {
        var done = this.async();
        var options = this.options();
        var crowdin;

        // Create a Crowdin instance with parameters
        try {
            crowdin = new Crowdin(options);
        }
        catch (e) {
            grunt.log.error(e);
            return false;
        }

        // Write file
        var writeFile = function(filepath, contents) {
            if (grunt.file.write(filepath, contents)) {
                grunt.log.writeln('File ' + chalk.cyan(filepath) + ' created.');
            }
        };

        // Normalize language keys to `en_GB` format
        // TODO: allow crustom normalization function and/or other formats in options
        var normalize = function(data) {
            var normalized = {};
            forEach(data, function(value, key) {
                var lang = key.replace('-', '_');
                lang = lang.replace(/_([a-zA-Z]{2})/, function (match, p) {
                    return '_' + p.toUpperCase();
                });
                normalized[ lang ] = value;
            });
            return normalized;
        };

        // Extract to JSON files, one for each language
        var extract = function(data) {
            forEach(data, function(value, key) {
                var filepath = options.extract + '/' + key + '.json';
                var contents = JSON.stringify(value, null, 4);
                writeFile(filepath, contents);
            });
        };

        // Write available languages to config (JSON) file
        // Use `language` key by default but can be set in options
        var writeConfig = function(data) {
            var config, contents, filepath, key, template;

            if (grunt.util.kindOf(options.writeConfig) === 'string') {
                options.writeConfig = {
                    src: options.writeConfig
                };
            }

            filepath = options.writeConfig.dest || options.writeConfig.src;
            key = options.writeConfig.key || 'languages';

            // Load existing config JSON
            if (options.writeConfig.src && grunt.file.exists(options.writeConfig.src)) {
                config = grunt.file.readJSON(options.writeConfig.src);
            }
            if (!config) {
                config = {};
            }
            // Set available languages in config
            config[ key ] = Object.keys(data);

            contents = JSON.stringify(config, null, 4);

            // Apply template
            if (options.writeConfig.tmpl && grunt.file.exists(options.writeConfig.tmpl)) {
                template = grunt.file.read(options.writeConfig.tmpl);
                contents = grunt.template.process(template, {
                    data: {
                        config: contents
                    }
                });
            }
            
            writeFile(filepath, contents);
        };

        crowdin.downloadToObject()
        .then(normalize)
        .then(function(data) {
            if (options.extract) {
                extract(data);
            }
            if (options.writeConfig) {
                writeConfig(data);
            }
        })
        .catch(function(err) {
            grunt.log.error(err);
            done(false);
        })
        .done(done);
    });

};
