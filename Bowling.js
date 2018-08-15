var Bowling = function(){
  this.rollsArray = [];
  this.scoresArray = [];
  this.rollCounter = 0;
  this.frameCounter = 1;
};

Bowling.prototype.roll = function(rollScore){
  var self = this;

  function throwAlert(){
    alert("Illegal score");
  };
// de tratat al 10-lea frame
  // function isIllegalScore(){
  //   return self.frameCounter % 2 === 0 && (rollScore + self.scoresArray[self.scoresArray.length - 1] > 10);
  // };
  
  function isIllegalScore() {
    var breaksLimit = rollScore + self.rollsArray[self.rollCounter - 1] > 10;
    if(! (self.frameCounter > 18)) {

      if(self.frameCounter % 2 === 1) {
      // orice aruncare in prima celula a unui frame este valida
        return false;
      };
    // o aruncare este valida in al 2-lea frame daca suma nu depaseste 10 popice
    return rollScore + self.rollsArray[self.rollCounter - 1] > 10;
    } else {

      if(self.frameCounter === 19) {

        return false;
      };
      if(self.frameCounter === 20) {
        var wasStrike = self.rollsArray[self.rollCounter - 1] === 10;
        return !wasStrike && breaksLimit;
      };
      var wasStrike = self.rollsArray[self.rollCounter - 1] === 10;
      var wasSpare = self.rollsArray[self.rollCounter - 2] + self.rollsArray[self.rollCounter - 1] === 10;
      return !wasStrike && !wasSpare && breaksLimit;
    };
  };
  
  if (isIllegalScore()){
    throwAlert();
  } else {
    self.rollsArray.push(rollScore);
    self.registerRoll(rollScore);
  };
};

Bowling.prototype.registerRoll = function(rollScore){
  var self = this;

  function tenthFrame (){
    return self.frameCounter > 18;
  };

  function isStrike(){
    return rollScore === 10;
  };

  function isFrameEnd(){
    return self.frameCounter % 2 === 0;
  };

  function isSpare(){
    return rollScore + self.scoresArray[self.scoresArray.length - 1] === 10;
  };

  function decideSpare(){
    if (isSpare()){
      self.scoresArray.push('/');
    } else {
      self.scoresArray.push(rollScore);
    };
    self.frameCounter ++;
  };

  function pushScore(){
    self.scoresArray.push(rollScore);
  };
// Ordine gresita if-uri, nu afiseaza X in al 10-lea frame
  if (tenthFrame()){
    if (rollScore === 10) {
      self.scoresArray.push('X');
    } else {
      if(self.frameCounter !== 19) {
      if(isSpare()) {
        self.scoresArray.push('/');  
      } else {
        pushScore();
      };
    };
  };
  self.frameCounter++;
} else if (isStrike()){
// De bagat X si null in loc de 0
    self.scoresArray.push('X');
    self.scoresArray.push('-');
    self.frameCounter += 2;
  } else if (isFrameEnd()){
    decideSpare();
  } else {
    pushScore();
    self.frameCounter ++;
  };
  self.rollCounter ++;
};

Bowling.prototype.cumulativeScore = function(frameNumber){
  var self = this;
  var score = 0;
  var frameStart = 0;

  function isStrike (){
    return self.rollsArray[frameStart] === 10;
  };

  function isSpare (){
    return self.rollsArray[frameStart] + self.rollsArray[frameStart + 1] === 10;
  };

  function frameTotal (){
    return self.rollsArray[frameStart] + self.rollsArray[frameStart + 1] || 0;
  };

  function strikeBonus (){
    return self.rollsArray[frameStart + 1] + self.rollsArray[frameStart + 2] || 0;
  };

  function spareBonus (){
    return self.rollsArray[frameStart + 2] || 0;
  };

  for (var i = 0; i < frameNumber; i ++){
    if(isStrike()){
      score += 10 + strikeBonus();
      frameStart ++;
    } else if (isSpare()){
      score += 10 + spareBonus();
      frameStart += 2;
    } else {
      score += frameTotal();
      frameStart += 2;
    };
  };
  return score;
};

Bowling.prototype.last_resolved_frame = 10;