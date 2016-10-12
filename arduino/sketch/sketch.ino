#include <WebUSB.h>

const WebUSBURL URLS[] = {
  { 1, "webusb.github.io/arduino/demos/" },
  { 0, "localhost:8000" },
};

const uint8_t ALLOWED_ORIGINS[] = { 1, 2 };

WebUSB WebUSBSerial(URLS, 2, 2, ALLOWED_ORIGINS, 2);

#define Serial WebUSBSerial

const int redPin = 13;
const int yellowPin = 12;
const int greenPin = 11;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  while (!Serial) {
    ;
  }
  Serial.begin(9600);
  Serial.write("Sketch begins.\r\n");
  Serial.flush();
}

int command = 0;

void turnOffSemaphores() {
  digitalWrite(redPin, LOW);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin, LOW);
}

void loop() {
  if (Serial && Serial.available()) {
    command = Serial.read();
    turnOffSemaphores();
    switch (command) {
      case 1:
        digitalWrite(redPin, HIGH);
        break;
      case 2:
        digitalWrite(yellowPin, HIGH);
        break;   
      case 3:
        digitalWrite(greenPin, HIGH);
        break;     
    }
    Serial.flush();
  }
}
