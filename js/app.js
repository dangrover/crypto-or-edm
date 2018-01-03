function shuffleArray(t){var e,s,o;for(o=t.length-1;o>0;o--)e=Math.floor(Math.random()*(o+1)),s=t[o],t[o]=t[e],t[e]=s;return t}function getCoinInfo(t){var e=new XMLHttpRequest,s="https://api.coinmarketcap.com/v1/ticker/"+t+"/";e.open("GET",s,!1),e.send();var o=JSON.parse(e.responseText);return console.log("Info = %o",o[0]),o[0]}var game_data={};$(function(){particlesJS.load("particles","data/particles.json",function(){}),$.getJSON("data/gamedata.json",function(t){console.log("loaded data: %o",t),game_data=t,console.log("game data: %o",game_data)},function(t){alert("Could not load game data.")})});var game=new Vue({el:"#game",data:{started:!1,ended:!1,guessed:!1,guessed_correct:!1,game_questions:[],current_question_idx:0,isCrypto:!1,total_correct:0},methods:{startGame:function(){this.started=!0,this.ended=!1,this.current_question_idx=0,this.total_correct=0,this.game_data=game_data;var t=shuffleArray(game_data.questions).slice(0,game_data.game_rules.questions_per_game);this.game_questions=t,this.amICrypto()},total_game_questions:function(){return this.game_questions.length},amICrypto:function(){null!=this.game_questions[this.current_question_idx].coinmarketcap_id?(console.log("Gonna fetch coin info"),this.game_questions[this.current_question_idx].coin_info=getCoinInfo(this.game_questions[this.current_question_idx].coinmarketcap_id),this.game_questions[this.current_question_idx].coin_marketcap=getCoinInfo(this.game_questions[this.current_question_idx].coinmarketcap_id).market_cap_usd,this.isCrypto=!0,console.log(this.game_questions[this.current_question_idx].coin_marketcap.toLocaleString("en")),console.log("new testing")):this.isCrypto=!1},nextQuestion:function(){this.amICrypto(),this.current_question_idx<this.game_questions.length-1?(this.current_question_idx+=1,this.guessed=null):(console.log("Game over"),this.ended=!0)},guess:function(t){console.log("guessed: %o",t),this.guessed=t;var e=this.game_questions[this.current_question_idx];t==e.category||"both"==e.category?(this.guessed_correct=!0,this.total_correct++):this.guessed_correct=!1,this.amICrypto()}}});