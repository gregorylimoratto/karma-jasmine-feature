/* global featureRunner */
(function (window) {
/*
	console.log(Object.keys(window.__karma__.files));
	var files = Object.keys(window.__karma__.files);
	var featureFilePattern = /(\.feature)$/;
	var featureFiles = files.filter(function(file){
		console.log(file);
		return featureFilePattern.test(file);
	});
	
*/	
	var initialLoadedFunc = window.__karma__.loaded;

	// change loaded fonction to run jasmine and feature runner together
	// (only one start function is allowed, so we can't define another one here)
	window.__karma__.loaded = function(){
		window.__karma__.loaded = initialLoadedFunc; 
		featureRunner.apply(window.__karma__).run();
		window.__karma__.loaded(window.__karma__);
	};
})(window);
