const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const htmlValidator = require('gulp-w3c-html-validator');

const config = require('../config');

module.exports = function pug2html() {
    return gulp.src('src/templates/*.pug')
        .pipe(plumber())
        .pipe(pugLinter({ reporter: 'default' }))
        .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
        // .pipe(htmlValidator())
        .pipe(gulp.dest('build'));
};
