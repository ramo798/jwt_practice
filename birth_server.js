const http = require("http")
const crypto = require("crypto")
const base64url = require("base64url")

const secret = "waiwaio"

const server = http.createServer((req, res) => {
  const jwtToken = req.headers["Authorization"]

  const [headerBase64, payloadBase64, signatureBase64] = jwtToken.split(".")

  const receivedSignature = base64url.toBase64(signatureBase64)

  const calculatedSignature = crypto
    .createHmac("sha256", secret)
    .update(headerBase64 + "." + payloadBase64)
    .digest("base64")

  if (receivedSignature !== calculatedSignature) {
    res.writeHead(401, { "Content-Type": "application/json" })
    return res.end(JSON.stringify({ message: "Invalid JWT" }))
  }

  payloadJson = JSON.parse(base64url.decode(payloadBase64))

  const today = new Date()
  const birthDate = new Date(payloadJson.birthday)
  let age = today.getFullYear() - birthDate.getFullYear()

  const jsonResponse = {
    message: "you are " + age + " years old.",
  }

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.writeHead(200, {
    "Content-Type": "application/json",
  })
  res.end(JSON.stringify(jsonResponse))
})

server.listen(3002, () => {
  console.log("Server running on http://localhost:3002/")
})
