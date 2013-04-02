// jasmine-async.js v0.1.0
/**
 * Helper function that wraps test functions in pairs of Jasmine runs() and
 * waitsFor() calls, passing a done function to each test function and
 * advancing the execution only when done() is called or the timeout expires.
 * A timeout value can optionally be passed as the first argument.
 *
 * @param timeout Timeout value in milliseconds (optional).
 * @param ... Function(s) to call asynchronously.
 */
function async() {
  var timeout = 1000,
      asyncCount = 0,
      args = Array.prototype.slice.call(arguments);

  if (typeof args[0] === 'number') {
    timeout = args.shift();
  }

  return function() {
    args.forEach(function (fn) {
      ++asyncCount;

      var runIsDone = false,
          done = function() { runIsDone = true;},
          description = args.length > 1
            ? 'asynchronous test (did you call done()?)'
            : 'asynchronous call ' + asyncCount + ' (did you call done()?)';

      runs(function () { fn(done); });
      waitsFor(function () { return runIsDone; }, description, timeout);
    });
  };
}
