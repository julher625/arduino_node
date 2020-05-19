/*
  Web client

 This sketch connects to a website (http://www.google.com)
 using an Arduino Wiznet Ethernet shield.

 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13

 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe, based on work by Adrian McEwen

 */

#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// if you don't want to use DNS (and reduce your sketch size)
// use the numeric IP instead of the name for the server:
IPAddress server(192,168,1,2);  // numeric IP
// Set the static IP address to use if the DHCP fails to assign
IPAddress ip(192, 168, 1, 10);
// Initialize the Ethernet client library
// with the IP address and port of the server
// that you want to connect to (port 80 is default for HTTP):
EthernetClient client;

bool printWebData = false;  // set to false for better speed measurement
bool first = true;
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  Serial.println("connecting...");
  delay(1000);

  // start the Ethernet connection:
  // try to congifure using IP address instead of DHCP:
  Ethernet.begin(mac, ip);

  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.print("connecting to ");
  Serial.print(server);
  Serial.println("...");

  // if you get a connection, report back via serial:
  conectar();
}

void loop() {
  // if there are incoming bytes available
  // from the server, read them and print them:
  // Make a HTTP request:

  int lectura = analogRead(A0);
  client.println("GET /send?data=" + String(lectura) + "&name=a");
  client.println(); 
  int len = client.available();
  if (len > 0) {
    byte buffer[80];
    if (len > 80) len = 80;
    client.read(buffer, len);
    if (printWebData) {
      Serial.write(buffer, len); // show in the serial monitor (slows some boards)
      Serial.println();
    }
  }

  // if the server's disconnected, stop the client:
  if (!client.connected()) {
    client.stop();
    client.flush();
    conectar();
  }

  delay(10);
}

void conectar(){



    if (client.connect(server, 80)) {
      if(first){
        Serial.print("connected to ");
        //Serial.println(client.remoteIP());
        first = false;
        }
    
  } else {
    // if you didn't get a connection to the server:
    Serial.println("connection failed");
  }
  
  }
