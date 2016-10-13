"use strict";
var Comm_1 = require('./Comm');
var comm = new Comm_1.default();
var port;
var connectButton = document.querySelector("#connect");
var redButton = document.querySelector("#red");
var yellowButton = document.querySelector("#yellow");
var greenButton = document.querySelector("#green");
redButton.addEventListener('click', function () {
    sendLight(1);
});
yellowButton.addEventListener('click', function () {
    sendLight(2);
});
greenButton.addEventListener('click', function () {
    sendLight(3);
});
function sendLight(light) {
    var ligthArr = new Uint8Array(1);
    ligthArr[0] = light;
    port.send(ligthArr);
}
function connect() {
    port.connect().then(function () {
        port.onReceive = function (data) {
            console.log(data);
        };
        port.onReceiveError = function (error) {
            console.error(error);
        };
    }, function (error) {
        console.log(error);
    });
}
connectButton.addEventListener('click', function () {
    if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        port = null;
    }
    else {
        comm.requestPort().then(function (selectedPort) {
            port = selectedPort;
            connectButton.textContent = 'Disconnect';
            connect();
        }).catch(function (error) {
            console.log(error);
        });
    }
});
//# sourceMappingURL=main.js.map