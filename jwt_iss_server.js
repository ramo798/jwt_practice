const http = require("http")
const crypto = require("crypto")
const base64url = require("base64url")

const secret = "waiwaio"

const server = http.createServer((req, res) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const payload = {
    issuer: "https://example.com",
    sub: "muramoto@raccoon.ne.jp",
    birthday: "1990-05-11",
    exp: 1516239022,
  }

  const headerBase64 = base64url.encode(JSON.stringify(header))
  const payloadBase64 = base64url.encode(JSON.stringify(payload))

  const signature = crypto
    .createHmac("sha256", secret)
    .update(headerBase64 + "." + payloadBase64)
    .digest("base64")

  const signatureBase64 = base64url.fromBase64(signature)

  const jwtToken = headerBase64 + "." + payloadBase64 + "." + signatureBase64

  const jsonResponse = {
    token: jwtToken,
  }

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.writeHead(200, {
    "Content-Type": "application/json",
  })
  res.end(JSON.stringify(jsonResponse))
})

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000/")
})
