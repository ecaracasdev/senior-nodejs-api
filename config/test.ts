export default {
    port: 1337,
    dbUri: "mongodb://localhost:27017/rest-api-tutorial",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshToken: "1y",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwsnkIauNaWdznVQ/p4w9
wA6+7xHsySuv4z8oMAevFJ40qxdZY9MG7TH7iQIWIr22fuu1X+mp2oclARZgryCc
sN86ENNSOP4v6mGbkgL5TM1/85B6cldxPBTXn9qI3RHwsD8mLBqpovAmQlq0mgM/
i19ODMgbK35uhfS6vhFLZqwSNhUJ9JJVN5M3t/ht4kr54w1fRYD87s+zmM6WfiER
V8eIlxo9hLSuBgSXYmVLZ9Qr6ifHvbNtHartitG+fJFS19cIY5+a4rAyW0HOsofa
qLzqlFLXqmGhON/tIXm5CHJpL/UZbeqAgU6FbiZp4ZSSkpqYnSE0/XBf9AGN41pp
2DWLA4PnNJOeVMjzhxo5ELfWfq+skqiYCR6dBs+4DnzTcLH6xTUtjmY6qXFWjrxV
yc3BMp2eKS4gC8GZQrjrqIyRK1OrszNLTqROto/LUaoEYVfDeJFKacjpC7AdCqoa
IPIZPrEY9j4Be2NBylfwY0NPQxUUJ2lmRMQi+aSCQ4yZis25R2WZpmeYKlaE/DOA
L/fr0d4AGyhz/+ruWGeAIGwkV4fCp0lW8ZbBl1fj/clRcSBWsS0T8SiGUxtUg75t
2jg1Hkrl+SJ2Udf2eT7a4zwwxJhWqePBmXX7Qbi9QoCYzBBRwWGz4IQNULgYSr5U
7eCioh7leoVlguZ4krT0nb8CAwEAAQ==
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`,
  };
  