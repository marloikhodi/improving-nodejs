import { Readable } from "node:stream"

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
        }, 200);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
})