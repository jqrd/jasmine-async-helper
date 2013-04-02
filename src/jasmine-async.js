/**
 * Helper function that wraps test functions in pairs of Jasmine runs() and
 * waitsFor() calls, passing a done function to each test function and
 * advancing the execution only when done() is called or the timeout expires.
 * A timeout value can optionally be passed as the first argument.
 *
 * @example
 * describe('the async() helper', function() {
 *
 *   it('is easy to use', async(function (done) {
 *     var result = false;
 *     setTimeout(function () {
 *       expect(result).toBe(true);
 *       done();
 *     }, 100);
 *     result = true;
 *   }));
 *
 *   it('supports custom timeout values', async(255, function (done) {
 *     var result = false;
 *     setTimeout(function () {
 *       expect(result).toBe(true);
 *       done();
 *     }, 100);
 *     result = true;
 *   }));
 *
 *   it('supports multiple functions', async(function (done) {
 *     setTimeout(function () {
 *       console.log('first part of the test');
 *       done();
 *     }, 100);
 *   }, function (done) {
 *     console.log('second part of the test');
 *     var result = false;
 *     setTimeout(function () {
 *       // this should fail
 *       expect(result).toBe(true);
 *       done();
 *     }, 100);
 *     result = true;
 *   }));
 *
 *   it('can also be used inside the regular test', function() {
 *     var count = 0;
 *
 *     async(function(done) {
 *       setTimeout(function () {
 *         count += 21;
 *         done();
 *       });
 *     });
 *
 *     async(function(done) {
 *       setTimeout(function () {
 *         count *= 2;
 *         done();
 *       });
 *     });
 *
 *     async(function(done) {
 *       expect(count).toBe(42);
 *       done();
 *     });
 *   });
 *
 * });
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
