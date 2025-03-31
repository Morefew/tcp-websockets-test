import net from "net";

const client = net.connect({ port: 1234, host: "127.0.0.1" });

client.on("connect", () => {
  console.log("Connected to server! Type messages to send (Ctrl+C to exit).");
});

// Send terminal input to the server
process.stdin.on("data", (data) => {
  client.write(data);
});

// Display server responses
client.on("data", (data) => {
  console.log("Server:", data.toString());
    if (data.toString().includes("CLOSE")) {
    client.end(); // Client closes itself.
  }
});

// Handle server disconnection
client.on("end", () => {
  console.log("Server closed the connection.");
  process.exit();
});