describe('the async() helper', function() {

  it('is easy to use', async(function (done) {
    var result = false;
    setTimeout(function () {
      expect(result).toBe(true);
      done();
    }, 100);
    result = true;
  }));

  it('supports custom timeout values', async(255, function (done) {
    var result = false;
    setTimeout(function () {
      expect(result).toBe(true);
      done();
    }, 100);
    result = true;
  }));

  it('supports multiple functions', async(function (done) {
    setTimeout(function () {
      console.log('first part of the test');
      done();
    }, 100);
  }, function (done) {
    console.log('second part of the test');
    var result = false;
    setTimeout(function () {
      // this should fail
      expect(result).toBe(true);
      done();
    }, 100);
    result = true;
  }));
  
  it('can also be used inside the regular test', function() {
    var count = 0;
    async(function(done) {
      setTimeout(function () {
        count += 21;
        done();
      });
    });
    async(function(done) {
      setTimeout(function () {
        count *= 2;
        done();
      });
    });
    async(function(done) {
      expect(count).toBe(42);
      done();
    });
  });

});
