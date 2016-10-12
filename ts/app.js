var arduino = {};

(function() {
  'use strict';

  arduino.getPorts = function() {
    return navigator.usb.getDevices().then(devices => {
      return devices.map(device => new arduino.Port(device));
    });
  };

  arduino.requestPort = function() {
    const filters = [
      { 'vendorId': 0x2341, 'productId': 0x8036 },
      { 'vendorId': 0x2341, 'productId': 0x8037 },
    ];
    return navigator.usb.requestDevice({ 'filters': filters }).then(
      device => new arduino.Port(device)
    );
  }

  arduino.Port = function(device) {
    this.device_ = device;
  };

  arduino.Port.prototype.connect = function() {
    let readLoop = () => {
      this.device_.transferIn(5, 64).then(result => {
        this.onReceive(result.data);
        readLoop();
      }, error => {
        this.onReceiveError(error);
      });
    };

    return this.device_.open()
      .then(() => {
        if (this.device_.configuration === null) {
          return this.device_.selectConfiguration(1);
        }
      })
      .then(() => this.device_.claimInterface(2))
      .then(() => this.device_.controlTransferOut({
          'requestType': 'class',
          'recipient': 'interface',
          'request': 0x22, // CDC_SET_CONTROL_LINE_STATE
          'value': 0x01,
          'index': 0x02}))
      .then(() => {
        readLoop();
      });
  };

  arduino.Port.prototype.disconnect = function() {
    return this.device_.controlTransferOut({
            'requestType': 'class',
            'recipient': 'interface',
            'request': 0x22,
            'value': 0x00,
            'index': 0x02})
        .then(() => this.device_.close());
  };

  arduino.Port.prototype.send = function(data) {
    return this.device_.transferOut(4, data);
  };
})();

let port = 0;

document.addEventListener('DOMContentLoaded', event => {

  let connectButton = document.querySelector("#connect");

  connectButton.addEventListener('click', function() {
    if (port) {
      port.disconnect();
      connectButton.textContent = 'Connect';
      port = null;
    } else {
      arduino.requestPort().then(selectedPort => {
        port = selectedPort;
        connectButton.textContent = 'Disconnect';
        connect();
      }).catch(error => {
        console.log(error);
      });
    }
  });

});
