/**
 * Implements a ring-buffer (aka a circular fixed length queue)
 * Useful to return a top N or tail N.
 */
class RingBuffer<T> {
    q: T[];
    headIdx: number = 0;
    len: number = 0;

    constructor(readonly MAX_SIZE: number) {
        this.q = new Array(MAX_SIZE);
    }

    add(val: T): RingBuffer<T> {
        this.q[this.headIdx] = val;
        this.headIdx = (this.headIdx + 1) % this.MAX_SIZE;
        this.len = this.len < this.MAX_SIZE ? this.len + 1 : this.MAX_SIZE;
        console.log('added val', val, this.q);
        return this;
    }

    values(): T[] {
        return this.q.map((undefined, i) => this.q[(this.headIdx + i) % this.len]);
    }
}
// Test
console.log(new RingBuffer(3).add('a').add('b').add('c')
    .values()
    .join(',') === 'a,b,c')

console.log(new RingBuffer(3).add('a').add('b').add('c').add('d')
    .values()
    .join(',') === 'b,c,d')
