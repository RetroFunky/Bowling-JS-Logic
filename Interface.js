var bowling = new Bowling();

function feedScoreToForm(){
  document.getElementsByName("game_score")[0].value = bowling.cumulativeScore(bowling.last_resolved_frame) ;
  
};
//@VICTOR AICI E IDU CARE TREBUIE MATCHUI CU BUTONU
function enableSubmit(){
  document.getElementById("butonLuca").disabled = false;
}
function disableButtons(){
  var vectorButtons = document.getElementsByClassName("btn");
  for (var i = 0; i <= 10; i++){
    vectorButtons[i].disabled = true;
  }
};
$(document).ready(function(){

  var afterRoll = function(){
    for (var i = 1; i <= bowling.last_resolved_frame; i ++){
      $('#f' + i + 'score').text(bowling.cumulativeScore(i));
    
      if ( bowling.last_resolved_frame === 10 ){
        disableButtons();
        feedScoreToForm();
        enableSubmit();
      }
    };
    for (var i = 1; i <= 21; i ++){
      $('.box' + i).text(bowling.scoresArray[i - 1]);
    };
  };

  $('#newgame').click(function() {
    location.reload();
  });

  $('#btn0').click(function(){
    bowling.roll(0);
      afterRoll();
  });

  $('#btn1').click(function(){
    bowling.roll(1);
      afterRoll();
  });

  $('#btn2').click(function(){
    bowling.roll(2);
      afterRoll();
  });

  $('#btn3').click(function(){
    bowling.roll(3);
      afterRoll();
  });

  $('#btn4').click(function(){
    bowling.roll(4);
      afterRoll();
  });

  $('#btn5').click(function(){
    bowling.roll(5);
      afterRoll();
  });

  $('#btn6').click(function(){
    bowling.roll(6);
      afterRoll();
  });

  $('#btn7').click(function(){
    bowling.roll(7);
      afterRoll();
  });

  $('#btn8').click(function(){
    bowling.roll(8);
      afterRoll();
  });

  $('#btn9').click(function(){
    bowling.roll(9);
      afterRoll();
  });

  $('#btn10').click(function(){
    bowling.roll(10);
      afterRoll();
  });
});