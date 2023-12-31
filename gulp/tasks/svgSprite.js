const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');

module.exports = function svgSprite() {
    return gulp.src('src/img/icons/**/*.svg')
        .pipe(svgstore({
            inlineSvg: true,
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'));
};
