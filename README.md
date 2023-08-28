# Del's-Monaco-Editor

## Description
Del's Monaco Editor is an online IDE. This IDE compiles and interpretes the code written in it. It has many awesome features which I have described in further points. This IDE currently supports `C`, `C++` and `Python`.

### Technologies
- MongoDB
- ExpressJs
- ReactJs
- NodeJs
- Bull library for Load Balancing
- APIs
- Multiple langugage support (`C`, `C++` and `Python`)

## Features
### VS Code theme UI
I have tried to make its theme more like that of VS Code to retains the familiarity with the VS Code. This UI consists of the editor section, status section and the output section.
<p align="center">
  <img src="https://raw.githubusercontent.com/dellucifer/Dels-Monaco-Editor/master/public/editor_landing.jpg" alt="Loading...">
</p>
<hr>

### Editor Features
These include:
- Syntax highlighting
- Auto complete of basic syntaxes
- Proper formatting of code
- Hierarchical
- VS Code shortcuts 
- Increases productivity

### Editor and code glimpses
Here I have written a sample code in `C++` having a loop. It will print 1 to 5 in different lines. You can see the hierarchy and syntax highlighting.
<p align="center">
  <img src="https://raw.githubusercontent.com/dellucifer/Dels-Monaco-Editor/master/public/editor_code.jpg" alt="Loading...">
</p>
<hr>

### Output section
As expected, the code will be 1 to 5 printed in different lines. This output is coming from the APIs written in `Node` at the backend.
<p align="center">
  <img src="https://raw.githubusercontent.com/dellucifer/Dels-Monaco-Editor/master/public/editor_outpur.jpg" alt="Loading...">
  <hr>
  <img src="https://raw.githubusercontent.com/dellucifer/Dels-Monaco-Editor/master/public/editor_python.jpg" alt="Loading...">
</p>
<hr>

### Load Balancing
I have used `Bull` library to make it balance the load. It consists of a `queue` data structure which takes in the request and have the capability to give output to 5 users simultaneouly. Then it will look for other requests in the queue to execute them using the node chile processes.

### Status and IDs
It also facilitates the user of the current state of their code by showing them the status of their request. If it shows `success`, it means the server has returned the output without any error in the code and the network. `pending` shows the code is getting compiled or interpreting on the server. It shows `error` status when the code throws an error or failed to executed.
<p align="center">
  <img src="https://raw.githubusercontent.com/dellucifer/Dels-Monaco-Editor/master/public/editor_status.jpg" alt="Loading...">
</p>
<hr>

Made with Love by Dellucifer
