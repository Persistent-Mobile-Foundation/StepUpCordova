/**
* Licensed Materials - Property of Persistent © Copyright 2023 Persistent Systems.
Portions of this code are derived from IBM Corp © Copyright IBM Corp. 2006, 2016.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PinCodeChallengeHandler = function(){
    var securityCheckName = 'StepUpPinCode';
    var challengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);
  
    challengeHandler.securityCheckName = securityCheckName;
    challengeHandler.handleChallenge = function(challenge) {
        var msg = "";
  
        // Create the title string for the prompt
        if(challenge.errorMsg !== null){
            msg =  challenge.errorMsg;
        }
        else{
            msg = "Enter PIN code:";
        }
  
        // Display a prompt for user to enter the pin code
        var pinCode = prompt(msg, "");
        if(pinCode){ // calling submitChallengeAnswer with the entered value
            challengeHandler.submitChallengeAnswer({"pin":pinCode});
        }
        else{ // calling cancel in case user pressed the cancel button
            challengeHandler.cancel();
        }
  
  
    };
  
    // handleFailure
    challengeHandler.handleFailure = function(error) {
        WL.Logger.debug("Challenge Handler Failure!");
        if(error.failure !== null && error.failure !== undefined){
           alert(error.failure);
        }
        else {
           alert("Unknown error");
        }
    };
  
    return challengeHandler;
  };
  