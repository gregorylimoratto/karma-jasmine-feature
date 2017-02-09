(function(){
  var nbCalls = 0;
	'use strict';
	featureSteps(/Only/)
    .given(/A scenario with no js implementation/, function() {
		})
		.when(/I include this scenario/, function() {
      nbCalls ++;
		})
		.then(/Nothing happens/, function() {
			expect(true).toBe(false);
		})

		.given(/A scenario with js implementation/, function() {
		})
		.given(/With the @only flag/, function() {
		})
		.then(/Others scenarii have not been executed/, function(){
      expect(nbCalls).toEqual(1);
		});
})();