// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-spec-reporter'),
            require('karma-junit-reporter'),
            require('karma-istanbul-threshold'),
            require('@angular/cli/plugins/karma')
        ],
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [
            { pattern: './src/test.ts', watched: false }
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
        },
        istanbulThresholdReporter: {
            src: 'reports/test/coverage/coverage-final.json',
            reporters: ['text'],
            thresholds: {
                global: {
                    statements: 100,
                    branches: 100,
                    lines: 100,
                    functions: 100,
                },
                each: {
                    statements: 100,
                    branches: 100,
                    lines: 100,
                    functions: 100,
                },
            }
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
        ? ['spec', 'junit', 'coverage-istanbul', 'istanbul-threshold']
        : ['spec', 'kjhtml'],
        junitReporter: {
            outputDir: 'reports/test/junit'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
