function shuffleArray(e){var t,s,a;for(a=e.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),s=e[a],e[a]=e[t],e[t]=s;return e}var game_data={};$(function(){particlesJS.load("particles","/data/particles.json",function(){}),$.getJSON("/data/gamedata.json",function(e){console.log("loaded data: %o",e),game_data=e,console.log("game data: %o",game_data)},function(e){alert("Could not load game data.")})});var game=new Vue({el:"#game",data:{started:!1,ended:!1,guessed:!1,guessed_correct:!1,game_questions:[],current_question_idx:0,total_correct:0},methods:{startGame:function(){this.started=!0,this.ended=!1,this.current_question_idx=0,this.total_correct=0,this.game_data=game_data;var e=shuffleArray(game_data.questions).slice(0,game_data.game_rules.questions_per_game);this.game_questions=e,console.log("selected questions = %o",this.gamequestions)},total_game_questions:function(){return this.game_questions.length},nextQuestion:function(){this.current_question_idx<this.game_questions.length-1?(this.current_question_idx+=1,this.guessed=null):(console.log("Game over"),this.ended=!0)},guess:function(e){console.log("guessed: %o",e),this.guessed=e;var t=this.game_questions[this.current_question_idx];e==t.category||"both"==t.category?(this.guessed_correct=!0,this.total_correct++):this.guessed_correct=!1}}});