const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
    script() {
        return gulp.src([
            'src/js/main.js',
        ])
            .pipe(plumber())
            .pipe(webpack({
                mode: process.env.NODE_ENV,
                output: {
                    filename: '[name].min.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components|libs|jsm)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                },
                            },
                        },
                    ],
                },
                plugins: [
                    new CircularDependencyPlugin(),
                    new DuplicatePackageCheckerPlugin(),
                ],
            }))
            .pipe(gulp.dest('build/js'))
    }
}

