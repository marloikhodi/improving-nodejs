// Apliocativos de Steam : netflix e spotify

import { Readable, Writable, Transform } from 'node:stream'

// Streams ->
// process.stdin
//     .pipe(process.stdout)

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++
        setTimeout(() => {

            if (i > 100) {
                this.push(null)
                //.push é o metodo de uma readable stream fornecer dados para quem está a consumindo 
                // null é o fim da stream
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
                //tudo enviado da stream de leitura é um CHUNK
            }
        }, 500);
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
        // primeiro parametro do callback é um erro, segundo parametro é o valor
    }
}

class MultiplyByTenStream extends Writable {
    //stream de escrita somente PROCESSA o dado, nao transforma
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
