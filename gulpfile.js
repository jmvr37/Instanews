const gulp = require("gulp");

const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create();
eslint = require("gulp-eslint");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyerror");
const sourcemaps = require("gulp-sourcemaps");


const sass = require("gulp-sass");

const uglifycss = require("gulp-uglifycss");

gulp.task("browser-sync", function (done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("build/css/*.css").on("change", browserSync.reload);

  done();
});

gulp.task("sass", function (done) {
  gulp
    .src("./sass/style.scss", { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./build/css"));

  done();
});

gulp.task("scripts", function () {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

gulp.task("reload", function () {
  browserSync.reload();
});

gulp.task("watch", function () {
  gulp.watch("js/*.js", gulp.series("scripts"));
  gulp.watch("sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.parallel("watch", "browser-sync"));
