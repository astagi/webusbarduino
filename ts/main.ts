import Comm from './Comm';

let comm = new Comm();
let port: any;

let connectButton = document.querySelector("#connect");

let redButton = document.querySelector("#red");
let yellowButton = document.querySelector("#yellow");
let greenButton = document.querySelector("#green");

redButton.addEventListener('click', () => {
  sendLight(1);
});

yellowButton.addEventListener('click', () => {
  sendLight(2);
});

greenButton.addEventListener('click', () => {
  sendLight(3);
});

function sendLight(light: number) {
  let ligthArr = new Uint8Array(1);
  ligthArr[0] = light;
  port.send(ligthArr);
}

function connect() {
  port.connect().then(() => {

    port.onReceive = data => {
      console.log(data);
    }
    port.onReceiveError = error => {
      console.error(error);
    };
  }, error => {
    console.log(error);
  });
}

connectButton.addEventListener('click', () => {
  if (port) {
    port.disconnect();
    connectButton.textContent = 'Connect';
    port = null;
  } else {
    comm.requestPort().then(selectedPort => {
      port = selectedPort;
      connectButton.textContent = 'Disconnect';
      connect();
    }).catch(error => {
      console.log(error);
    });
  }
});

