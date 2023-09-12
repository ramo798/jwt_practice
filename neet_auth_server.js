const http = require("http")
const crypto = require("crypto")
const base64url = require("base64url")

const secret = "waiwaio"

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Headers", "Authorization")

  const jwtToken = req.headers["authorization"]

  if (!jwtToken) {
    return res.end(JSON.stringify({ message: "No JWT token provided" }))
  }

  const [headerBase64, payloadBase64, signatureBase64] = jwtToken.split(".")

  const receivedSignature = base64url.toBase64(signatureBase64)

  const calculatedSignature = crypto
    .createHmac("sha256", secret)
    .update(headerBase64 + "." + payloadBase64)
    .digest("base64")

  if (receivedSignature !== calculatedSignature) {
    return res.end(JSON.stringify({ message: "Invalid JWT" }))
  }

  const jsonResponse = {
    message: "Hello, World!",
  }

  res.end(JSON.stringify(jsonResponse))
})

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001/")
})
