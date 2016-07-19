import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';
import { Instrumenter } from 'isparta';

let plugins = gulpLoadPlugins();

const serverPaths = {
  scripts: [
    '**/!(*.spec|*.integration).js',
    '!mocha.conf.js',
    '!gulpfile.babel.js',
    '!node_modules/**/*',
    '!dist/**/*.js',
    '!coverage/**/*',
    '!config/local.env.sample.js'
  ],
  json: '**/*.json',
  test: {
    integration: 'api/**/*.integration.js',
    unit: 'api/**/*.spec.js',
    coverage: [
      'api/**/*.js',
      '!api/**/*.events.js',
      '!api/**/*.socket.js'
    ]
  }
};

const distPath = 'dist';

/********************
 * Helper functions
 ********************/

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

/********************
 * Reusable pipelines
 ********************/

let lintServerScripts = lazypipe()
  .pipe(plugins.jshint, './.jshintrc')
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

let lintServerTestScripts = lazypipe()
  .pipe(plugins.jshint, './.jshintrc-spec')
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

let transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    plugins: [
      'transform-class-properties',
      'transform-runtime'
    ]
  })
  .pipe(plugins.sourcemaps.write, '.');

let mocha = lazypipe()
  .pipe(plugins.mocha, {
    reporter: 'spec',
    timeout: 5000,
    require: [
      './mocha.conf'
    ]
  });

let istanbul = lazypipe()
  .pipe(plugins.istanbul.writeReports)
  .pipe(plugins.istanbulEnforcer, {
    thresholds: {
      global: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80
      }
    },
    coverageDirectory: './coverage',
    rootDirectory : ''
  });

/********************
 * Env
 ********************/

gulp.task('env:test', () => {
  plugins.env({
    vars: { NODE_ENV: 'test' }
  });
});

gulp.task('env:prod', () => {
  plugins.env({
    vars: { NODE_ENV: 'production' }
  });
});

/********************
 * Tasks
 ********************/

gulp.task('transpile:server', () => {
  return gulp.src(_.union(serverPaths.scripts, serverPaths.json))
    .pipe(transpileServer())
    .pipe(gulp.dest(distPath));
});

gulp.task('lint:scripts:server', () => {
  return gulp.src(_.union(serverPaths.scripts, _.map(serverPaths.test, blob => '!' + blob)))
    .pipe(lintServerScripts());
});

gulp.task('lint:scripts:serverTest', () => {
  return gulp.src(serverPaths.test)
    .pipe(lintServerTestScripts());
});

gulp.task('jscs', () => {
  return gulp.src(serverPaths.scripts)
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  nodemon(`-w index.js index.js`)
    .on('log', onServerLog);
});

gulp.task('start:server:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  nodemon(`-w ./${distPath} ./${distPath}`)
    .on('log', onServerLog);
});

gulp.task('start:inspector', () => {
  gulp.src([])
    .pipe(plugins.nodeInspector());
});

gulp.task('start:server:debug', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  nodemon(`-w ./ --debug-brk ./`)
    .on('log', onServerLog);
});

gulp.task('watch', () => {
  var testFiles = _.union(serverPaths.test.unit, serverPaths.test.integration);

  plugins.livereload.listen();

  plugins.watch(_.union(serverPaths.scripts, testFiles))
    .pipe(plugins.plumber())
    .pipe(lintServerScripts())
    .pipe(plugins.livereload());

});

gulp.task('serve', cb => {
  runSequence(
    'lint:scripts:server',
    'start:server',
    'watch',
    cb
  );
});

gulp.task('serve:dist', cb => {
  runSequence(
    'clean:dist',
    'build',
    'start:server:prod',
    cb
  );
});

gulp.task('serve:debug', cb => {
  runSequence(
    'lint:scripts:server',
    'start:inspector',
    'start:server:debug',
    'watch',
    cb
  );
});

gulp.task('test', cb => {
  return runSequence('test:server', cb);
});

gulp.task('test:server', cb => {
  runSequence(
    'env:test',
    'mocha:unit',
    'mocha:integration',
    'mocha:coverage',
    'mocha:coveralls',
    cb
  );
});

gulp.task('mocha:unit', () => {
  return gulp.src(serverPaths.test.unit)
    .pipe(mocha());
});

gulp.task('mocha:integration', () => {
  return gulp.src(serverPaths.test.integration)
    .pipe(mocha());
});

gulp.task('build', cb => {
  runSequence(
    'clean:dist',
    'transpile:server',
    'copy:server',
    cb
  );
});

gulp.task('clean:dist', () => del([`${distPath}/!(.git*)**`], {dot: true}));

gulp.task('copy:server', () => {
  return gulp.src([
    'package.json',
    'Dockerfile',
    '.env.example'
  ], {cwdbase: true})
    .pipe(gulp.dest(distPath));
});

gulp.task('coverage:pre', () => {
  return gulp.src(serverPaths.test.coverage)
    .pipe(plugins.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('coverage:unit', () => {
  return gulp.src(serverPaths.test.unit)
    .pipe(mocha())
    .pipe(istanbul());
});

gulp.task('coverage:integration', () => {
  return gulp.src(serverPaths.test.integration)
    .pipe(mocha())
    .pipe(istanbul());
});

gulp.task('mocha:coveralls', () => {
  return gulp.src('coverage/**/lcov.info')
    .pipe(plugins.coveralls());
});

gulp.task('mocha:coverage', cb => {
  runSequence(
    'coverage:pre',
    'env:test',
    'coverage:unit',
    'coverage:integration',
    cb
  );
});
