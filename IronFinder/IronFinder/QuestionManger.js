/**
 * MV family core object to handle MV* family pattern
 * 
 */
argos.classes.MvStar = (function(jQuery) {
	
	/**
	 * Global MvStar
	 */
	MvStar = {};
	
	/**
	 * JQuery
	 */
	var $ = jQuery;
	
	/**
	 * Inherit the parent object
	 * 
	 * @param Object parentObj
	 */
	inheritParent = function(parentObj) {
		var childObj = function () {};
		childObj.prototype = parentObj;
		return new childObj();
	}
	
	/**
	 * Keep all child properties with inherited parent's properties in new deep copy object
	 * so no accidental object reference update
	 * 
	 * @param Object parentObj
	 * @param Object childObj
	 */
	// 
	MvStar.Extend = function(parentObj, childObj) {
		var extendedChild = inheritParent(parentObj);
		for (childProps in childObj) {
			//if (parentModel.hasOwnProperty(parProps)) {
			extendedChild[childProps] = childObj[childProps];
			//}
		}
		
		return extendedChild;
	}
	
	/**
	 * Base model
	 */
	MvStar.Model = function() {
		
	}
	
	/**
	 * Extend base models, views, viewModels
	 */
	MvStar.Model.Extend = MvStar.Extend;
	
	/**
	 * Base view model
	 */
	MvStar.ViewModel = function() {
		/**
		 * Template ID
		 */
		this.template = '';
		
		/**
		 * Set Template ID
		 */
		this.setTemplate = function(id) {
			this.template = id;
		}
		
		/**
		 * Get Template ID
		 */
		this.getTemplate = function() {
			return this.template;
		}
		
		/**
		 * Render view associated with Model
		 * 
		 * @param Object model
		 * @param Boolean display true|false
		 * 
		 */
		this.render = function(model, display, reset) {
			var result = '',
			templateObj = $("#" + this.getTemplate());
			
			for (prop in model) {
				var currentModel = model[prop];
				if ("object" == typeof currentModel) {
					var currentView = templateObj.html();
					for (propCurrent in currentModel) {
						if (currentModel[propCurrent]) {
			                var regexApply = new RegExp("{{" + propCurrent + "}}","g");
			                currentView = currentView.replace(regexApply, currentModel[propCurrent]);
						}
					}
					result += currentView;
				}
			}
			
			// if you want to display the rendered view
			if (display) {
				templateObj.html('');
				templateObj.html(result);
				templateObj.show();
			}
			
			// if you want to remove the raw contents from the rendered area
			if (reset) {
				templateObj.html('');
			}
			
			return result;
		}
	}
	/**
	 * Base view model
	 */
	MvStar.View = function() {
	}
	
	/**
	 * Base controller test
	 */
	MvStar.Controller = function() {
		
	}
	/**
	 * Main Question manager
	 */
	MvStar.QuestionManger = function() {
		
		/**
		 * Main config data, change here depending upon your requirements
		 */
		this.config = function() {
			return {
				 'questions' : [
				                
				                // each question
				                {
								 	'name' : 'How often do you iron',
								 	'description' : "We'd like to understand more about your ironing workload",
								 	'id': '1',
								 	'class': 'q1',
								 	'next' : '2',
								 	'previous' : 'None', // don't change this particular first previous id None
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q1-1',
									            	  'answer':'Less than once a month',
									            	  'score':5
									              },
									              {
									            	  'aid' : 'q1-2',
									            	  'answer':'15 to 30 minutes',
									            	  'score':5
									              },
												  {
									            	  'aid' : 'q1-3',
									            	  'answer':'30 minutes to an hour',
									            	  'score':5
									              },
												  {
									            	  'aid' : 'q1-4',
									            	  'answer':'1 to 2 hours',
									            	  'score':5
									              },
												  {
									            	  'aid' : 'q1-5',
									            	  'answer':'More than 2 hours',
									            	  'score':5
									              },
								              ]
				                },
				                
				             // each question
				                {
								 	'name' : 'How long is your average ironing session',
								 	'description' : "Now we'd like to understand how long you spend ironing. <br>This helps us thinking about the amount of water you may need",
								 	'id': '2',
								 	'class': 'q2',
								 	'next' : '3',
								 	'previous' : '1',
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q2-1',
									            	  'answer':'Occasionally',
									            	  'score':10
									              },
									              {
									            	  'aid' : 'q2-2',
									            	  'answer':'1 or 2 times a month',
									            	  'score':10
									              },
												  {
									            	  'aid' : 'q2-3',
									            	  'answer':'Once a week',
									            	  'score':10
									              },
												  {
									            	  'aid' : 'q2-4',
									            	  'answer':'2 or 3 times a week',
									            	  'score':10
									              },
												  {
									            	  'aid' : 'q2-5',
									            	  'answer':'Everyday',
									            	  'score':10
									              },
								              ],
						              'matrix' : [
								                 	 ['', 			'q1-1', 'q1-2', 'q1-3', 'q1-4', 'q1-5'],
									                 ['q2-1', 		1, 		1, 		2, 		2, 		2],
									                 ['q2-2', 		1, 		2,		2, 		2, 		2],
									                 ['q2-3', 		2,	 	2,		4,		5,		5],
									                 ['q2-4', 		2,		4, 		5,		5,		5],
									                 ['q2-5', 		2,		5,		5,		5,		5]
								                 ]
				                },
				                
				             // each question
				                {
								 	'name' : 'Do you iron everything at once, or only selected items',
								 	'description' : "Now we'd like to understand if you iron by necessity <br>or wheather you iron everything at once",
								 	'id': '3',
								 	'class': 'q3',
								 	'next' : '4',
								 	'previous' : '2',
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q3-1',
									            	  'answer':'Only selected items',
									            	  'score':15
									              },
									              {
									            	  'aid' : 'q3-2',
									            	  'answer':'Everything, including underwear etc',
									            	  'score':15
									              },
								              ],
						              'matrix' : [
								                 	 ['', 			'standard_iron', 'super_efficient_iron', 'standard_steam_station', 'super_efficient_station'],
									                 ['q3-1', 		1, 				  2, 					 4, 						5],
									                 ['q3-2', 		1, 				  3, 					 5, 						5]
								                 ]
				                },
				                
				             // each question
				                {
								 	'name' : 'Do you sort your garments before ironing',
								 	'description' : "Thank you! We'd like to understand <br>how you iron different materials",
								 	'id': '4',
								 	'class': 'q4',
								 	'next' : '5',
								 	'previous' : '3',
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q4-1',
									            	  'answer':'No, I iron items as they come',
									            	  'score':20
									              },
									              {
									            	  'aid' : 'q4-2',
									            	  'answer':'Yes, I sort them by fabric type',
									            	  'score':20
									              },
								              ],
						              'matrix' : [
								                 	 ['', 			'standard_iron', 'super_efficient_iron', 'home_professional_iron', 'standard_steam_station', 'super_efficient_station'],
									                 ['q4-1', 		1, 				  2, 					 3, 						6,						  6],
									                 ['q4-2', 		1, 				  2, 					 3, 						4,						  5]
								                 ]
				                },
								
								// each question
				                {
								 	'name' : "Do you pack everything away once it's over",
								 	'description' : "Almost there. Now we'd like to understand how much <br> room you have available",
								 	'id': '5',
								 	'class': 'q5',
								 	'next' : '6',
								 	'previous' : '4',
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q5-1',
									            	  'answer':'No, I store everything after session is over',
									            	  'score':20
									              },
									              {
									            	  'aid' : 'q5-2',
									            	  'answer':'Yes, I leave my ironing board open',
									            	  'score':20
									              },
								              ],
						              'matrix' : [
								                 	 ['', 			'standard_iron', 'super_efficient_iron', 'home_professional_iron', 'standard_steam_station', 'super_efficient_station', 	'home_professiona_steam_station'],
									                 ['q5-1', 		1, 				  2, 					 3, 						4,						  5,							6],
									                 ['q5-2', 		1, 				  4, 					 3, 						5,						  5,							6]
								                 ]
				                },
								
								// each question
				                {
								 	'name' : 'What do you currently own',
								 	'description' : 'One final question to help us understand what type of iron you <br>already own and what other types you may consider going forward',
								 	'id': '6',
								 	'class': 'q6',
								 	'next' : 'redirect', // don't change this particular next id redirect
								 	'previous' : '5',
								 	// answers
								 	'answers' : [
									              {
									            	  'aid' : 'q6-1',
									            	  'answer':'No iron',
									            	  'score':20
									              },
									              {
									            	  'aid' : 'q6-2',
									            	  'answer':'Steam iron',
									            	  'score':20
									              },
												  {
									            	  'aid' : 'q6-3',
									            	  'answer':'Steam station',
									            	  'score':20
									              },
								              ],
						              'matrix' : [
								                 	 ['', 			'standard_iron', 'super_efficient_iron', 'home_professional_iron', 'standard_steam_station', 'super_efficient_station', 	'home_professiona_steam_station'],
									                 ['q6-1', 		1, 				  2, 					 3, 						4,						  5,							6],
									                 ['q6-2', 		1, 				  4, 					 3, 						5,						  5,							6],
									                 ['q6-3', 		4, 				  4, 					 5, 						5,						  5,							6]
								                 ]
				                },
				                
				               ],
				     'redirection': {
									'0-30'    : 'http://www.argos.co.uk/static/Search/searchTerms/AFFORDABLE+AND+CONVENIENT+IRONING+FOR+YOU.htm',
									'31-60'   : 'http://www.argos.co.uk/static/Search/searchTerms/FAST+AND+EFFICIENT+IRONING+FOR+YOU.htm',
									'61-90'   : 'http://www.argos.co.uk/static/Search/searchTerms/IRONS+FOR+PROFESSIONAL+RESULTS+AT+HOME.htm',
									'91-120'  : 'http://www.argos.co.uk/static/Search/searchTerms/AFFORDABLE+AND+POWERFUL+STEAM+GENERATORS.htm',
									'120-150' : 'http://www.argos.co.uk/static/Search/searchTerms/CUTTING+YOUR+IRONING+TIME+IN+HALF.htm',
									'150-200' : 'http://www.argos.co.uk/static/Search/searchTerms/ADVANCED+IRONING+TECHNOLOGY.htm'
									},
									
					 'products': {
						'1'    	: {'value' : 'standard_iron', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/AFFORDABLE+AND+CONVENIENT+IRONING+FOR+YOU.htm'},
						'2'   	: {'value' : 'super_efficient_iron', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/FAST+AND+EFFICIENT+IRONING+FOR+YOU.htm'},
						'3'   	: {'value' : 'home_professional_iron', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/IRONS+FOR+PROFESSIONAL+RESULTS+AT+HOME.htm'},
						'4'  	: {'value' : 'standard_steam_station', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/AFFORDABLE+AND+POWERFUL+STEAM+GENERATORS.htm'},
						'5' 	: {'value' : 'super_efficient_station', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/CUTTING+YOUR+IRONING+TIME+IN+HALF.htm'},
						'6' 	: {'value' : 'home_professiona_steam_station', 'url' : 'http://www.argos.co.uk/static/Search/searchTerms/ADVANCED+IRONING+TECHNOLOGY.htm'},
						},
						
						'settings' : {
							'adapter' : 'productScoreAdapter' // productScoreAdapter | scoreRangeAdapter
						},
				               
				};
		}
		
	}
	
	/**
	 * Helper functions
	 */
	MvStar.Helper = function() {
		/**
		 * Parse start and end range score
		 * 
		 * @param String range
		 */
		this.parseRange = function(range) {
			var rangeArray = range.split('-'),
			start = rangeArray[0], end = rangeArray[1];
			
			return {
				'start' : start,
				'end' : end
			};
		}
		/**
		 * get redirect url
		 */
		this.redirect = function(redirectionModel, score) {
			for(props in redirectionModel) {
				var range = this.parseRange(props);
				if (score >= range.start && score <= range.end) {
					return redirectionModel[props];
				}
			}
			return '';
		}
		
		/**
		 * Get the matrix value
		 * 
		 * Logic to get the right score
		 * 
		 * @param Model currentQuestionModel
		 * @param Model scoreModel
		 * @param String previousAnswer
		 * 
		 * @return Number matrxModel[yAxisPosition][xAxisPosition]
		 */
		this.getCurrentMatrixValue = function(currentQuestionModel, scoreModel, previousAnswer) {
			var matrxModel = currentQuestionModel.matrix,
			questionId = currentQuestionModel.id,
			previousQuestionId = currentQuestionModel.previous,
			currentAnswer = scoreModel.scores[questionId],
			previousAnswer = previousAnswer ? previousAnswer : scoreModel.scores[previousQuestionId];
			
			//console.log('scoreModel' , scoreModel);
			//console.log('matrxModel' , matrxModel);
			//console.log("previousAnswer" , previousAnswer);
			//console.log("currentAnswer" , scoreModel.scores[questionId]);

			 var xAxisPosition, yAxisPosition; 

			for (var ind in matrxModel) {
			    var eachRow = matrxModel[ind]; 
			    for (var indIn in eachRow) {
			    	//console.log('ind indIn ' + ind + ' ' + indIn + ' ' + matrxModel[ind][indIn]);
					if (typeof matrxModel[ind][indIn] != 'undefined')
					{
				        if (ind == 0) { // previous
				            if (previousAnswer == matrxModel[ind][indIn]) {
				                xAxisPosition = indIn;
				                //console.log('here previous ' + indIn);
				            } else {
				            	continue;
				            }
				        } else { // current
				            if (currentAnswer == matrxModel[ind][indIn]) {
				                yAxisPosition = ind;
				             //console.log('here current ' + ind);
				            } else {
				            	continue;
				            }
				        }
					}
				}
			}

			//console.log('xAxisPosition ',  xAxisPosition);
			//console.log('yAxisPosition ',  yAxisPosition );
			//console.log('result ', matrxModel[yAxisPosition][xAxisPosition]);
			
			return matrxModel[yAxisPosition][xAxisPosition];
		}
		
		/**
		 * Get current score
		 * 
		 * @param Model productModel
		 * @param Model scoreModel
		 * @param Model mainQuestionsModel
		 * 
		 * @return String currentProductMatrixValue
		 */
		this.currentScore = function(productModel, scoreModel, mainQuestionsModel) {
			//console.log('productModel', productModel);
			//console.log('scoreModel', scoreModel);
			//console.log('mainQuestionsModel', mainQuestionsModel);
			
			var previousAnswer;
			currentProductMatrixValue = 'undefined';
			
			 for(var i=1; i <= mainQuestionsModel.length; i++) {
	        	if (typeof mainQuestionsModel[i] != 'undefined') {
	        		var forceToGetProduct = i == 1 ? 1 : 0, // if this is second question
	        		currentQuestionModel = mainQuestionsModel[i];
	        		
	        		//console.log('compar -> ' + i);
	        		if (forceToGetProduct) {
	        			currentProductMatrixValue = this.getCurrentMatrixValue(currentQuestionModel, scoreModel, '');
	        		} else {
	        			//console.log('currentProductMatrixValue -> ' + currentProductMatrixValue);
	        			if (typeof currentProductMatrixValue != 'undefined') {
	        				previousAnswer = productModel[currentProductMatrixValue].value;
	        			}
	        			//console.log('previousAnswer -> ' + previousAnswer);
	        			currentProductMatrixValue = this.getCurrentMatrixValue(currentQuestionModel, scoreModel, previousAnswer);
	        		}
		        }
	        }
			 //console.log('currentProductMatrixValue -- ' + currentProductMatrixValue);
			 return currentProductMatrixValue;
		}
		
		return this;
	}
	
	/**
	 * Score Model
	 */
	MvStar.ScoreModel = function() {
		this.scores = [];
		this.set = function(question, score) {
			this.scores[question] = score;
		}
	
		this.get = function() {
			var total = 0;
			for (props in this.scores) {
				if(this.scores[props] && typeof this.scores[props] != 'function') {
					total += parseInt(this.scores[props]);
				}
			}
			return total;
		}
	}
	
	return MvStar;
	
}).call(null, jQuery);

/**
 * Global Functions
 */
MvStar.QuestionManger.Functions = (function() {
	
	/**
	 *  Some global objects
	 */
	scoreModel = new MvStar.ScoreModel(),
	helperModel = new MvStar.Helper(),
	questionMangerModel = new MvStar.QuestionManger();
	
	/**
	 * Grey line for currently selected question
	 */
	greyLineCurrentQuestion = function(currentObj) {
		if(!currentObj.hasClass("active")) {
			$(".progressChecker").removeClass("current");
			currentObj.addClass("current");
		}
	}
    
	/**
	 * Listen for the questions in progress on mouse over
	 */
	listenQuestionProgressMouseOver = function(questionId, lowerQuestionId, previous) {
		if ('None' == previous || jQuery("#" + previous).hasClass("complete")) {
			jQuery("#" + questionId + " a").css('cursor', 'pointer');
		}
	}
	
	/**
	 * Listen for the questions in progress
	 */
	listenQuestionProgress = function(questionId, lowerQuestionId, previous) {
		if ('None' == previous || jQuery("#" + previous).hasClass("complete")) {
			jQuery(".lowerQuestions").hide();
			jQuery("#" + lowerQuestionId).show();
			//greyLineCurrentQuestion(jQuery("#" + questionId));
		}
	}

	/**
	 * Make Current Question Active
	 */
	makeCurrentQuestionActive = function(questionId, next) {
		jQuery(".progressChecker").removeClass("current");
		jQuery("#" + questionId).addClass("active complete progressChecker");
		if (next) {
			greyLineCurrentQuestion($("#" + next));
		}
	}
	
	/**
	 * Go To Next Question
	 */
	goToNextQuetion = function(next) {
		jQuery(".lowerQuestions").hide();
		jQuery("#question-" + next).show();
	}
	
	/**
	 * Display Current Answer
	 */
	displayCurrentAnswer = function(questionId, answerId) {
		jQuery("#question-" + questionId + " .stepchoice").removeClass("selected-answer");
		jQuery("#" + answerId).addClass("selected-answer");
	}
	
	/**
	 * Score Range Adapter
	 */
	scoreRangeAdapter = function() {
		var totalScore = scoreModel.get(),
        redirectionModel = questionMangerModel.config().redirection,
        redirectUrl = helperModel.redirect(redirectionModel, totalScore);
        
        return redirectUrl;
	}
	
	/**
	 * Product Score Adapter
	 */
	productScoreAdapter = function() {
		var productModel = questionMangerModel.config().products,
        mainQuestionsModel = questionMangerModel.config().questions,
        currentScore =  helperModel.currentScore(productModel, scoreModel, mainQuestionsModel),
        redirectUrl = productModel[currentScore].url;
        
        return redirectUrl;
	}
	
	/**
	 * get redirection url
	 */
	getRedirectionUrl = function(adapter) {
		//console.log('adapter -> ' + adapter);
		switch(adapter) {
			case 'productScoreAdapter':
				return productScoreAdapter();
				break;
			case 'scoreRangeAdapter':
				return scoreRangeAdapter();
				break;
			default:
				return productScoreAdapter();
				break;
		}
	}
	
	/**
	 * Set adapter property
	 */
	setAdapterProperty = function(adapter, scoreModel, questionId, answerId, score) {
		switch(adapter) {
			case 'productScoreAdapter':
				//console.log('answer set' + answerId);
				scoreModel.set(questionId, answerId);
				break;
			case 'scoreRangeAdapter':
				//console.log('score set ' + score);
				scoreModel.set(questionId, score);
				break;
			default:
				scoreModel.set(questionId, answerId);
				break;
		}
	}
	
	/**
	 * Listen for answers
	 */
	listenAnswer = function(answerId, score, next, questionId) {
		// set adapter properties
		// todo : the adapter pattern used here should be changed whenever got enough time
		
		var adapter = questionMangerModel.config().settings.adapter;
		setAdapterProperty(adapter, scoreModel, questionId, answerId, score);
		//console.log('scoreModel' , scoreModel);
		
		if (next != 'redirect') {
			makeCurrentQuestionActive(questionId, next);
			displayCurrentAnswer(questionId, answerId);
			goToNextQuetion(next);
		} else {
			makeCurrentQuestionActive(questionId);
			var redirectUrl = getRedirectionUrl(adapter);
//			alert('redirectUrl -> ' + redirectUrl);
	        window.location.href = redirectUrl;
	        return false;
		}
	}
	
}).call(null, jQuery);

/**
 * Controller class to run all required steps
 */
MvStar.QuestionManger.Controller = function() {
	
	// Model the main template with number of questions
	var questionManger = new MvStar.QuestionManger(),
	mainQuestionsModel = questionManger.config().questions,
    questionMangerViewModel = new MvStar.ViewModel();
    
    // Model the upper oval questions
    questionMangerViewModel.setTemplate("questionProgress");
    questionMangerViewModel.render(mainQuestionsModel, true);
    
    // Model the lower pane questions
    questionMangerViewModel.setTemplate("questions");
    questionMangerViewModel.render(mainQuestionsModel, true);
    
    // Model each answers
    for(var i=0; i <= mainQuestionsModel.length; i++) {
    	var currentId = '';
    	if (typeof mainQuestionsModel[i] != 'undefined') {
        	currentId = "answer-" + mainQuestionsModel[i].id;
        	var answersModel = mainQuestionsModel[i].answers;
        	questionMangerViewModel.setTemplate(currentId);
    		questionMangerViewModel.render(answersModel, true);
       	}
    }
    
    // display first question answers only
    var firstQuestionObj = $("#" + "question-" + mainQuestionsModel[0].id);
    var firstQuestionProgressObj = $("#" + mainQuestionsModel[0].id);
    firstQuestionObj.show();
    greyLineCurrentQuestion(firstQuestionProgressObj);
}

// call it to get project iron running
MvStar.QuestionManger.Controller();