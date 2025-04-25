Persistent Mobile Foundation
===
## StepUpCordova
A sample application demonstrating the use of multiple challenge handlers.

### Tutorials

### Usage

 ### Installation of plugin
In PMF server console Dashboard ,Click on Download Center => Click on SDKs tab => Download the Cordova SDK
Navigate to the root of your existing Cordova project and add the PMF core Cordova plug-in:

`cordova plugin add [path-to downloaded pmf cordova plugin]/cordova-plugin-pmf`

1. From a command-line window, navigate to the project's root folder and run the commands:
  - Add a platform: `cordova platform add`
  - Register the application: `pmfdev app register`
2. Use either Maven, PMFdev CLI or your IDE of choice to [build and deploy the available `ResourceAdapter`, `StepUpUserLogin` and `StepUpPinCode` adapters](https://pmf.persistentproducts.com/tutorials/en/foundation/9.0/adapters/creating-adapters/).
3. In the PMF console, under **Applications** → **StepUpCordova** → **Security** → **Map scope elements to security checks**, add a mapping from `accessRestricted` to `StepUpUserLogin`.
4. Add a mapping from `transferPrivilege` to both `StepUpUserLogin` and `StepUpPinCode`.
5. Back in the command-line, run the Cordova application by running the `cordova run` command.

SecurityCheck adapter: https://github.com/Persistent-Mobile-Foundation/SecurityCheckAdapters

### Supported Levels
Persistent Mobile Foundation 9.1 & 9.0.x

### License
Licensed Materials - Property of Persistent © Copyright 2023 Persistent Systems.
Portions of this code are derived from IBM Corp © Copyright IBM Corp. 2006, 2016.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
