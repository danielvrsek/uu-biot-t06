// json library - ArduinoJson 6.19.4 by Benoit Blanchon
#include <ArduinoJson.h>

// dht sensor library - DHT sensor library by Adafruit 1.4.3
#include "DHT.h"

// arduino pin, where data sensor of dht11 is connected
#define DHTPIN 2
 
//define sensor type
#define DHTTYPE DHT11

//define delay 5s
#define DELAY 5000


unsigned long previousMillis = 0;  

// assign sensor type and arduino pin to variable
DHT dht(DHTPIN, DHTTYPE); 

// set variable for humidity
float hum;

// set variable for temperature
float temp;  

// define json document
StaticJsonDocument<20> doc;    
                               
void setup()
{
  // define serial at 9600 bauds
  Serial.begin(9600);  
   
  // begint DHT sensor communication                     
  dht.begin();             
                 
}

void loop()
{
    unsigned long currentMillis = millis();
    
    if (currentMillis - previousMillis >= DELAY) {
      previousMillis = currentMillis;
      
      // read humidity from DHT11
      hum = dht.readHumidity();  
      // read temperature from DHT11
      temp = dht.readTemperature();  
      
      //send via serial port
      doc["temperature"] = temp;
      doc["humidity"] = hum;
      serializeJson(doc, Serial);
      Serial.println();
   
    }
                                 
}
