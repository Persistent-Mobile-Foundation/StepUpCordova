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
var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to PMF Knowledge Center.
};

var userLoginChallengeHandler, pinCodeChallengeHandler;
// Called automatically after PMF framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
    document.getElementById("getBalance").addEventListener("click", getBalance);
    document.getElementById("transferFunds").addEventListener("click", transferFunds);
    document.getElementById("logout").addEventListener("click", logout);
    userLoginChallengeHandler = UserLoginChallengeHandler();
    pinCodeChallengeHandler = PinCodeChallengeHandler();
    showLoginDiv();
}

function showLoginDiv() {
    document.getElementById('protectedDiv').style.display = 'none';
    document.getElementById('statusMsg').innerHTML = "";
    document.getElementById('loginDiv').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
}

function showProtectedDiv() {
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('resultLabel').innerHTML = "";
    document.getElementById('protectedDiv').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
}

function getBalance() {
    var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/balance", WLResourceRequest.GET);
    resourceRequest.send().then(
        function (response) {
            WL.Logger.debug("Balance: " + response.responseText);
            document.getElementById("resultLabel").innerHTML = "Balance: " + response.responseText;
        },
        function (response) {
            WL.Logger.debug("Failed to get balance: " + JSON.stringify(response));
            document.getElementById("resultLabel").innerHTML = "Failed to get balance.";
        });
}

function transferFunds(){
  //Preemptively check if user is logged in before asking for the amount
  WLAuthorizationManager.obtainAccessToken(userLoginChallengeHandler.securityCheckName).then(
      function (accessToken) {
        var amount = prompt("Enter amount:");
        if(amount !== null && !isNaN(amount)){
          var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/transfer", WLResourceRequest.POST);

          resourceRequest.sendFormParameters({"amount":amount}).then(
              function (response) {
                  document.getElementById("resultLabel").innerHTML = "Transfer successful";
              },
              function (response) {
                  WL.Logger.debug("Failed to get balance: " + JSON.stringify(response));
                  document.getElementById("resultLabel").innerHTML = "Failed to perform transfer.";
              });
        }
      },
      function (response) {
          WL.Logger.debug("obtainAccessToken onFailure: " + JSON.stringify(response));
  });
}

function logout() {
    WLAuthorizationManager.logout(userLoginChallengeHandler.securityCheckName).then(
        function () {
            WL.Logger.debug("logout from userLoginChallengeHandler onSuccess");
            WLAuthorizationManager.logout(pinCodeChallengeHandler.securityCheckName).then(function () {
                WL.Logger.debug("logout from pinCodeChallengeHandler onSuccess");
                location.reload();
            }, function (error) {
                WL.Logger.debug("logout from pinCodeChallengeHandler onFailure: " + JSON.stringify(error));
            });
        },
        function (error) {
            WL.Logger.debug("logout from userLoginChallengeHandler onFailure: " + JSON.stringify(error));
        });
}
