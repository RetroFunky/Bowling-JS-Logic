var Bowling = function() {
  this.rollsArray = [];
  this.scoresArray = [];
  this.rollCounter = 0;
  this.cellCounter = 1;
  this.last_resolved_frame = 0;
};

Bowling.prototype.roll = function( rollScore ){
  var self = this;

  function throwAlert(){
    alert("Illegal score");
  };

  function isIllegalScore() {
    var breaksLimit = rollScore + self.rollsArray[self.rollCounter - 1] > 10;
    if (! ( self.cellCounter > 18 ) ) {
      if ( self.cellCounter % 2 === 1) {
// orice aruncare in prima celula a unui frame este valida
        return false;
      };
// o aruncare este valida in al 2-lea frame daca suma nu depaseste 10 popice
    return rollScore + self.rollsArray[self.rollCounter - 1] > 10;
    } else {
      if ( self.cellCounter === 19 ) {

        return false;
      };
      if ( self.cellCounter === 20 ) {
        var wasStrike = self.rollsArray[self.rollCounter - 1] === 10;
        return ! wasStrike && breaksLimit;
      };
      var wasStrike = self.rollsArray[self.rollCounter - 1] === 10;
      var wasSpare = self.rollsArray[self.rollCounter - 2] + self.rollsArray[self.rollCounter - 1] === 10;
      return !wasStrike && !wasSpare && breaksLimit;
    };
  };
  
  if ( isIllegalScore() ) {
    throwAlert();
  } else {
    self.rollsArray.push( rollScore );
    console.log( rollScore );
    self.registerRoll( rollScore );
  };
};

Bowling.prototype.registerRoll = function( rollScore ) {
  var self = this;

  function finalFrame () {
    return self.cellCounter > 18;
  };

  function isStrike() {
    return rollScore === 10 && self.cellCounter % 2 === 1;
  };

  function isFrameEnd() {
    return self.cellCounter % 2 === 0;
  };

  function isSpare() {
    return rollScore + self.rollsArray[self.rollCounter - 1] === 10;
  };

  function decideSpare() {
    if ( isSpare() ) {
      self.scoresArray.push('/');
    } else {
      self.scoresArray.push( rollScore );
    };
  };

  function get_current_frame() {
  	return Math.floor( self.cellCounter / 2 ) + self.cellCounter % 2;
  }

  function was_strike() {
  	return self.cellCounter >= 3 && self.rollsArray[self.rollCounter - 1] === 10; // - 2?
  };
  
  function was_spare() {
  	return self.cellCounter >= 3 && ! was_strike() && self.rollsArray[self.rollCounter - 1] + self.rollsArray[self.rollCounter - 2] === 10;
  };
  
  function was_double_strike() {
		return self.last_resolved_frame < get_current_frame() - 2;
  };
  
  function calculate_last_resolved_frame() {

  	
    if ( self.cellCounter === 20 ) {
      if ( self.rollsArray[self.rollCounter - 1] === 10 ){
  			self.last_resolved_frame = get_current_frame() - 1;
  			return;
  		}

      if (self.rollsArray[self.rollCounter - 1] !== 10){
        self.last_resolved_frame = get_current_frame();
      }
  	}
  	if ( self.cellCounter == 21 ) {
  		self.last_resolved_frame = 10;
  		return; 
  	}

	  if( self.cellCounter % 2 === 1 ){


  		if ( was_spare() ) {
  			self.last_resolved_frame = get_current_frame() - 1;
  			return; 
  		};
  		if ( was_double_strike() ) {
  			self.last_resolved_frame = get_current_frame() - 2;
  			return;
  		};
	  } else { // sunt pe celula para in frame
			if( !isSpare() ){ // caz particular double strike
				console.log("Aici am prezis");
				self.last_resolved_frame = get_current_frame();
				return; 
			}
			else {
				self.last_resolved_frame = get_current_frame() - 1;
				return;
			}
		}
  };
  function pushScore() {
    self.scoresArray.push( rollScore );
  };

  var strike_counter = 0 ;
  if ( finalFrame() ){
    if ( rollScore === 10 ) {
         if( self.cellCounter === 19 || self.rollsArray[self.rollCounter - 1] !== 0 ) {
         	 self.scoresArray.push('X');
         }
         else {
         	self.scoresArray.push("/");
         }
         // inca o conditie 
    } else {
      if( self.cellCounter !== 19 ) {
        if(isSpare() && rollScore !== 0) {
          if( self.rollsArray[self.rollCounter - 1] + self.rollsArray[self.rollCounter - 2] === 10 ) {
            pushScore();
          }
          self.scoresArray.push('/');  
        } else {
          pushScore();
        };
    }	else {
    		pushScore();
    } ;
  };
} else if ( isStrike() ) {

// De bagat X si null in loc de 0
  self.scoresArray.push('X');
  self.scoresArray.push('-');
  strike_counter ++;
  } else if ( isFrameEnd() ){
    decideSpare();
  } else {
    pushScore();
  };

  calculate_last_resolved_frame();
  self.cellCounter += 1 + strike_counter;
  self.rollCounter ++;
};

Bowling.prototype.cumulativeScore = function( frameNumber ){
  var self = this;
  var score = 0;
  var frameStart = 0;

  function isStrike () {
    return self.rollsArray[frameStart] === 10;
  };

  function isSpare () {
    return self.rollsArray[frameStart] + self.rollsArray[frameStart + 1] === 10;
  };

  function frameTotal () {
    return self.rollsArray[frameStart] + self.rollsArray[frameStart + 1] || 0;
  };

  function strikeBonus () {
    return self.rollsArray[frameStart + 1] + self.rollsArray[frameStart + 2] || 0;
  };

  function spareBonus () {
    return self.rollsArray[frameStart + 2] || 0;
  };

  for ( var i = 0; i < frameNumber; i ++ ) {
    if( isStrike() ) {
      score += 10 + strikeBonus();
      frameStart ++;
    } else if ( isSpare() ){
      score += 10 + spareBonus();
      frameStart += 2;
    } else {
      score += frameTotal();
      frameStart += 2;
    };
  };
  return score;
};
