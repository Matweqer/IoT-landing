const gulp = require('gulp');

const serve = require('./gulp/tasks/serve');
const pug2html = require('./gulp/tasks/pug2html');
const styles = require('./gulp/tasks/styles');
const { script } = require('./gulp/tasks/script');
const fonts = require('./gulp/tasks/fonts');
const models = require('./gulp/tasks/models');
const imageMinify = require('./gulp/tasks/imageMinify');
const clean = require('./gulp/tasks/clean');
const svgSprite = require('./gulp/tasks/svgSprite');

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
        cb();
    };
}
// eslint-disable-next-line
const resourceTasks = gulp.parallel(pug2html, styles, script, fonts, models, imageMinify);
const build = gulp.series(clean, svgSprite, resourceTasks);

module.exports.start = gulp.series(setMode(), build, serve);
module.exports.build = gulp.series(setMode(true), build);
