const gulp = require("gulp"); // Load Gulp!
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create();
eslint = require("gulp-eslint");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyerror");
const sourcemaps = require("gulp-sourcemaps");

//Sass required element -  https://www.npmjs.com/package/gulp-sass
const sass = require("gulp-sass");
//Minify our css -  https://www.npmjs.com/package/gulp-uglifycss
const uglifycss = require("gulp-uglifycss");

gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("build/css/*.css").on("change", browserSync.reload);

  done();
});

gulp.task("sass", function(done) {
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

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("reload", function() {
  browserSync.reload();
});

gulp.task("watch", function() {
  gulp.watch("js/*.js", gulp.series("scripts"));
  gulp.watch("sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.parallel("watch", "browser-sync"));
