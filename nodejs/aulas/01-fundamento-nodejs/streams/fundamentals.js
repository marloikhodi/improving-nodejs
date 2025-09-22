// Apliocativos de Steam : netflix e spotify

import { Readable } from 'node:stream'

// Streams ->
// process.stdin
//     .pipe(process.stdout)

class oneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++
        setTimeout(() => {

            if (i > 100) {
                this.push(null) //.push é o metodo de uma readable stream fornecer dados para quem está a consumindo 
                // null é o fim da stream
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 1000);
    }
}

new oneToHundredStream().pipe(process.stdout)