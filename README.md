grunt-crowdin-net
=================

Grunt plugin for accessing the Crowdin API

## Disclaimer

This is an unofficial API client library. Crowdin and the Crowdin API are the property of Crowdin, LLC.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-crowdin-net --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-crowdin-net');
```

## The "crowdin" task

### Overview
In your project's Gruntfile, add a section named `crowdin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  crowdin: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.apiKey (REQUIRED)
Type: `String`

Your Crowdin API key.

#### options.endpointUrl (REQUIRED)
Type: `String`

The Crowdin endpoint URL for your project.

#### options.extract
Type: `String`

The directory to extract translations files to.

#### options.writeConfig
Type: `String` or `Object`

The config file (JSON) to write the list (Array) of available languages codes.

It can be set as an `Object` accepting the following options:
- `src`: Config file to read.
- `dest`: Config file to write. Defaults to `src` value if not set.
- `key`: Name of the key containing the available languages. Defaults to `languages`.
- `tmpl`: Template file to apply, using [grunt.template.process](http://gruntjs.com/api/grunt.template).
The `src` data (JSON) will be extended by the `key` and passed to the `tmpl` template as the `config` variable, before being written to `dest`. See example below.

### Usage Example

#### Simple example

```js
grunt.initConfig({
    crowdin: {
        default: {
            options: {
                apiKey: '36d53ad244654f0d9f6198d53b781b76', // Your Crowdin API key - must be set
                endpointUrl: 'http://api.crowdin.net/api/project/<your-project>', // Your Crowdin project endpoint URL - must be set
                extract: 'data/i18n',
                writeConfig: 'config/i18n.json'
            }
        }
    }
});
```

Assuming your project contains `en_GB` and `en_US` languages, using the above configuration will create the files `data/i18n/en_GB.json` and  `data/i18n/en_US.json` with the languages keys/values, and create/update `config/i18n.json` with the following contents:
```
{
    "languages": [
        "en_GB",
        "en_US"
    ]
}
```

#### Customized config

```js
// Gruntfile.js
grunt.initConfig({
    crowdin: {
        default: {
            options: {
                apiKey: '36d53ad244654f0d9f6198d53b781b76',
                endpointUrl: 'http://api.crowdin.net/api/project/<your-project>',
                writeConfig: {
                    src: 'config/i18n.json',
                    key: 'available_languages'
                    tmpl: 'config/template.js',
                    dest: 'build/config.js'
                }
            }
        }
    },
});

// config/i18n.json
{
    "default_language": "en",
    "json_url": "/data/i18n"
}

// config/template.js
var config = {
    env: "dev",
    i18n: <%= config %>
};

// Resulting build/config.js
var config = {
    env: "dev",
    i18n: {
        "available_languages": [
            "en_GB",
            "en_US"
        ],
        "default_language": "en",
        "json_url": "/data/i18n"
    }
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

Apache 2.0  
Copyright 2014 Hailo
