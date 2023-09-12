const http = require("http")
const fs = require("fs")
const path = require("path")

const hostname = "127.0.0.1"
const port = 3003

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Not Found")
      } else {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(data)
      }
    })
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Not Found")
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
