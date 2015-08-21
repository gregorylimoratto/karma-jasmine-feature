var Gherkin = require('gherkin');
var parser = new Gherkin.Parser(new Gherkin.AstBuilder());

var createFeaturePreprocessor = function(logger, basePath) {
  var log = logger.create('preprocessor.feature');

  return function(content, file, done) {
    log.info('Processing "%s".', file.originalPath);
    
    var feature = parser.parse(new Gherkin.TokenScanner(content), new Gherkin.TokenMatcher());
    
    var featureTitle = feature.name;
    if (feature.description){
      featureTitle += " : " + feature.description;
    }
    
    var featureSpec = "feature('"+ featureTitle.replace(/'/g,'\\\'') + "')";
    feature.scenarioDefinitions.forEach(function (scenario){
      var scenarioTemplate = "\n\t.scenario('" + scenario.name.replace(/'/g,'\\\'') + "')";
      
      var previousKeyword = "given";
      scenario.steps.forEach(function(step){
        var keyword = step.keyword.toLowerCase().trim();
        switch(keyword){
          case "given":
          case "when":
          case "then":
            previousKeyword = keyword;
            break;
          default:
            // And / But / ...
            keyword = previousKeyword;
        }
        console.log(step.argument ?  step.argument.rows[1].cells : "");
        scenarioTemplate += "\n\t\t." + keyword + "('" + step.text.replace(/'/g,'\\\'') + "'";
        if(step.argument){
          var tableArg = [];
          var properties = [];
          step.argument.rows[0].cells.forEach(function(cell){
            properties.push(cell.value);
          })
          
          for(var j=1; j<step.argument.rows.length;j++){
            var row = step.argument.rows[j];
            var argument = {};
            for(var k=0; k<row.cells.length; k++){
              argument[properties[k]] = row.cells[k].value;
            }
            tableArg.push(argument);
          }
          
          scenarioTemplate += "," + JSON.stringify(tableArg);
        }
        scenarioTemplate+= ")";
      });
      
      if (scenario.examples) { 
        
        scenario.examples[0].tableBody.forEach(function(exemple){
          var exempleTemplate = scenarioTemplate;
          for(var i=0;i<exemple.cells.length;i++){
            var paramName = scenario.examples[0].tableHeader.cells[i].value;
            var value = exemple.cells[i].value;
            var re = new RegExp("<" + paramName + ">","g");
            exempleTemplate = exempleTemplate.replace(re, value);
          }
          featureSpec += exempleTemplate;
        });
      }else{
        featureSpec += scenarioTemplate;
      }
    });
    console.log(featureSpec);
    /*
    feature('jasmine-cucumber: Should use regexp to find matchable steps') 
			.scenario('can call when after then')
				.given('enqueue "1"')
				.when('enqueue "2"')
				.then('should be "1,2"')
				.when('enqueue "3"')
				.then('should be "1,2,3"')
			.scenario('can convert json into table args')
				.given('I have two persons', [{lastName: "Doe", firstName:"John"}, {lastName:"Boby", firstName:"Poulpe"}])
				.when('I remove the first one')
				.then('I have just one person', {lastName:"Boby", firstName:"Poulpe"}); 
     */
    //file.path = file.path + '.js';
    done(featureSpec);
  };
};

createFeaturePreprocessor.$inject = ['logger', 'config.basePath'];

module.exports = createFeaturePreprocessor;