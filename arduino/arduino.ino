#include <dht.h>

dht DHT;

#define DHT11_PIN 2
#define DELAY 5000

void setup(){
  Serial.begin(9600);
}

void loop(){
  int chk = DHT.read11(DHT11_PIN);
  switch (chk)
  {
    case DHTLIB_OK:
      printData();
      break;
    case DHTLIB_ERROR_CHECKSUM: 
      printError(1);
      return;
    case DHTLIB_ERROR_TIMEOUT: 
      printError(2);
      return;
    default: 
      printError(3); 
      return;
  }
  
  delay(DELAY);
}

void printData(){
    Serial.print("{ temperature: ");
    Serial.print((int)DHT.temperature);
    Serial.print(", humidity: ");
    Serial.print((int)DHT.humidity);
    Serial.println("}");
}

void printError(int code){
  Serial.print("Error: code ");
  Serial.println(code);
}
