(function (window) {
	var initialLoadedFunc = window.__karma__.loaded;

	// change loaded fonction to run jasmine and feature runner together
	// (only one start function is allowed, so we can't define another one here)
	window.__karma__.loaded = function(){
		featureRunner.apply(window.__karma__).run();
		initialLoadedFunc.apply(window.__karma__);
	};
})(window);
