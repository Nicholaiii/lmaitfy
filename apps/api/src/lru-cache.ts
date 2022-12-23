import LRU from 'lru-cache'

const kB = 1024
const mB = kB * 1024

const options: LRU.Options<string, string> = {
  max: 1000,
  maxSize: 256 * mB,
  sizeCalculation: n => n.length
}

export const lru = new LRU(options)
