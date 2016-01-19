(function(){
	'use strict';
	featureSteps(/Roman numerals/)
		.given(/I have a Roman numerals calculator/, function(){
			this.calculator = new Calculator();
		})
		.given(/I enter '(.*)' in the calculator/, function(roman){
			this.calculator.setInput(roman);
		})
		.when(/I convert the roman numeral/, function(){
			this.calculator.convert();
		})
		.when(/I press add/, function(){
			this.calculator.add();
		})
		.then(/the displayed value is '(.*)'/, function(num){
		//	expect(this.calculator.getDisplayedValue()).toBe(num);
		});
	
    featureSteps(/Roman numerals/)
		.given(/a blog post named "(.*)" with Markdown body/, function(param1, docString){
            expect(docString).toBe("Some Title, Eh?\n"+
"===============\n"+
"Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,\n"+
"consectetur adipiscing elit.");
		})
    	
	featureSteps(/Roman numerals/)
		.given("I add a quote ' in step",function(){})
		.when("I run the scenario with (.*)",function(param){ 
			this.param = param; 
		})
		.then('the first Example is "(.*)"',function(test){ 
			expect(this.param).toBe(test); 
		});
	featureSteps(/Roman numerals/)
		.given(/I use Q/, function(){ 
			this.promise = Q; 
		})
		.when(/I have a promise setting '(.*)' in context after (\d+) ms/, function(message, ms){ 
			var defer = this.promise.defer();
			var self = this;
			setTimeout(function(){
				if (message === "fail"){
					//defer.reject({errorMessage: message});
					
					self.message = message;
					defer.resolve();
				} else {
					self.message = message;
					defer.resolve();
				}
			}, ms);
			return defer.promise;
		})
		.then(/I have '(.*)' in context/,function(message){
			expect(this.message).toBe(message); 
		});
		
})();


function Calculator(){ 
	this.inputs = [];
}

Calculator.prototype.add = function(){
	
}

Calculator.prototype.getDisplayedValue = function(){
	
}

Calculator.prototype.setInput = function(value){
	this.inputs.push(value);
}

Calculator.prototype.convert = function(){
	
}