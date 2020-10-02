const tls = require("tls");
const fs = require("fs");

const options = {
  ca: fs.readFileSync("keys/ca-crt.pem"),
  key: fs.readFileSync("keys/client1-key.pem"),
  cert: fs.readFileSync("keys/client1-crt.pem"),
  host: "localhost",
  port: 8000,
  rejectUnauthorized: true,
  requestCert: true,
};

const socket = tls.connect(options, () => {
  console.log(
    "client connected",
    socket.authorized ? "authorized" : "unauthorized"
  );
  process.stdin.pipe(socket);
  process.stdin.resume();
});

socket.setEncoding("utf8");

socket.on("data", (data) => {
  console.log(data);
});

socket.on("error", (error) => {
  console.log(error);
});

socket.on("end", (data) => {
  console.log("Socket end event");
});
