import * as net from "net";

function newConn(socket) {
	console.log("new connection", socket.remoteAddress, socket.remotePort)
	socket.on("end", () => {
		// FIN received. The connection will be closed automatically.
		console.log("EOF.")
	})
	socket.on("data", data => {
		const message = data.toString().trim(); // Removes \n, \r, and spaces
		console.log("client:", message)
		socket.write(data) // echo back the data.
		// actively closed the connection if the data contains 'q'
		if (message === "q") {
			console.log(`closing gracefully the connection for: ${socket.remoteAddress}, ${socket.remotePort}, ${socket.remoteFamily}`);
			socket.write("CLOSE"); // Notify client.
			socket.end(); // Send FIN.
		}
	})
	process.stdin.on("data", (data) => {
		socket.write(data);
	});
}
let server = net.createServer()
server.on("error", err => {
	throw err
})
server.on("connection", newConn)
server.listen({ host: "127.0.0.1", port: 1234 })