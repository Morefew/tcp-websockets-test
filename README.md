# TCP Echo Server with Graceful Shutdown

> A simple TCP server-client implementation in Node.js demonstrating graceful connection handling

## Table of Contents

- [Introduction](#introduction)
  - [Goal of the project](#goal-of-the-project)
- [Features](#features)
- [Installation](#installation)
- [Testing the Application](#testing-the-application)
  - [Step-by-Step Test](#step-by-step-test)
- [API](#api)
- [Events](#events)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Introduction

This project implements a basic TCP server and client in Node.js that:
- Establishes TCP connections between server and client
- Echoes back all received messages to the client
- Implements graceful connection shutdown when client sends "q"
- Demonstrates proper FIN/ACK handling in TCP connections

The server logs connection details and handles clean termination, while the client provides an interactive interface for sending messages.

Here's the "Goal of the Project" subsection for your README:

---

### Goal of the Project

This project was created to explore core TCP networking concepts through practical implementation. The main focus was understanding how TCP connections are established (three-way handshake), maintained (full-duplex communication), and terminated (FIN/ACK exchange), while abstracting away the low-level details handled by the operating system.

Through building this server-client pair, I aimed to practice working with socket primitives - particularly the distinction between listening sockets (for servers) and connection sockets (for established links). The implementation demonstrates bidirectional communication where either side can initiate closure, while properly handling the EOF signals that indicate transmission completion.

Special attention was given to graceful connection shutdown patterns, including half-open states where one direction closes while the other remains active. The project serves as a hands-on exploration of how network applications manage socket lifecycles, from binding/listening through data exchange to proper resource cleanup.

## Features

- **TCP Server**:
    - Listens on port 1234 (configurable)
    - Logs new connections with client details
    - Echoes all received messages back to client
    - Gracefully closes connection on receiving "q" command
    - Sends "CLOSE" notification before termination

- **TCP Client**:
    - Connects to localhost:1234
    - Interactive terminal interface
    - Displays server responses
    - Automatically closes on server termination signal
    - Handles connection termination events

## Installation

1. Clone the repository or copy the files
2. Ensure Node.js (v14+) is installed


Here's the expanded **Testing** section for your README with clear two-terminal instructions and visual cues:

---

## Testing the Application

### 🖥️ Dual-Terminal Setup Required
This client-server application requires **two separate terminal windows** to function properly:

```bash
┌─────────────────────┐    ┌─────────────────────┐
│    TERMINAL 1       │    │    TERMINAL 2       │
│    SERVER           │    │    CLIENT           │
├─────────────────────┤    ├─────────────────────┤
│ npm run server      │    │ npm run client      │
│                     │    │                     │
│ Listening on        │    │ Connected!          │
│ 127.0.0.1:1234      │    │ Type messages below │
└─────────────────────┘    └─────────────────────┘
```

### Step-by-Step Test
1. **Start the Server** (Terminal 1)
   ```bash
   npm run server
   ```
  - Should display:  
    `Server listening on 127.0.0.1:1234`

2. **Start the Client** (Terminal 2)
   ```bash
   npm run client
   ```
  - Should display:  
    `Connected to server! Type messages (Ctrl+C to exit)`

3. **Test Communication**:
  - In **Terminal 2 (Client)**, type:
    ```text
    Hello
    ```
  - Both terminals should show:
    - Server logs: `data: Hello`
    - Client shows: `Server says: server: Hello`

4. **Test Graceful Shutdown**:
  - In **Terminal 2 (Client)**, type:
    ```text
    q
    ```
  - Expected behavior:
    - Server logs: `closing gracefully...`
    - Client automatically disconnects

### ❌ Common Mistakes
- **Single Terminal Error**: Running both in same terminal will freeze the interface
- **Port Conflicts**: Ensure no other apps use port 1234


## API

### Server (`server.js`)
- `net.createServer()` - Creates TCP server
- `server.listen(options)` - Starts listening on specified port
- `socket.write(data)` - Sends data to client
- `socket.end()` - Initiates graceful connection close

### Client (`client.js`)
- `net.connect(options)` - Establishes connection to server
- `client.write(data)` - Sends data to server
- `client.end()` - Closes client connection

## Events

### Server Events
- `connection` - Emitted when new client connects
- `data` - Emitted when data received from client
- `end` - Emitted when client initiates connection close

### Client Events
- `connect` - Emitted when connection to server is established
- `data` - Emitted when data received from server
- `end` - Emitted when server closes connection

## Acknowledgments

- Node.js `net` module documentation
- TCP protocol specifications (RFC 793)

## License

ISC

---