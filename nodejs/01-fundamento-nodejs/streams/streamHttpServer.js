import http from 'node:http'
import { Transform } from 'node:stream'
import { buffer } from 'node:stream/consumers'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
        // primeiro parametro do callback é um erro, segundo parametro é o valor
    }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

server.listen(3334)