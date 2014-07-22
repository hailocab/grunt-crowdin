grunt-crowdin
=============

Grunt plugin for accessing the Crowdin API

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-crowdin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-crowdin');
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

The config file (JSON) to write available languages in.

It can be set as an `Object` accepting the following options:
- `src`: Config file to read.
- `dest`: Config file to write. Defaults to `src` value if not set.
- `key`: Key to associate available translations to in the JSON. Defaults to `languages`.

### Usage Example

```js
grunt.initConfig({
  crowdin: {
    options: {
        apiKey: '36d53ad244654f0d9f6198d53b781b76', // Your Crowdin API key - must be set
        endpointUrl: 'http://api.crowdin.net/api/project/<your-project>', // Your Crowdin project endpoint URL - must be set
        extract: 'data/i18n',
        writeConfig: {
            src: 'config/i18n.json',
            key: 'available_languages'
        }
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
