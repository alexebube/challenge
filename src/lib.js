// const listProduct = (a = []) => (b = []) => [].concat(...a.map(a1 => b.map(b1 => [].concat(a1, b1))));

function* listProduct(head, ...tail) {
    const remainder = tail.length > 0 ? listProduct(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
}

const getInputArrays = (xs = []) => xs.map(x => x.split(','));

const getPairs = fn => (acc = []) => (xs = []) => {
    const len = xs.length - 1;
    for (let i = 0; i <= len; i++) {
        for (let j = i; j <= len; j++) {
            acc.push(...fn(xs[i], xs[j]))
        }
    }
    return acc
};

const isEqual = (s = '') => (x = '') => (s !== x) && s.split(',').every(a => x.split(',').includes(a));

const countPairs = (xs = []) => xs.filter(([a, b]) => a !== b)
    .reduce((a, b) => Object.keys(a).includes(b.join(','))
        ? { ...a, [b.join(',')]: a[b.join(',')] + 1 }
        : { ...a, [b.join(',')]: 1 }, {});

const groupUniquePairs = fn => (acc = {}) => (n = []) => (o = {}) => {
    const keys = Object.keys(o);
    for (const a of keys) {
        let i = 1;
        for (const b of keys.slice(i)) {
            if(fn(a)(b)) {
                if (!acc.hasOwnProperty(a)){
                    acc[a] = o[a] + o[b];
                    n.push(a,b)
                }
            }
        }
        if(!acc.hasOwnProperty(a)) {
            if (!n.includes(a)) {
                acc[a] = o[a]
            }
        }
        i = i + 1
    }
    return acc
};

const pairsAboveThreshold = (n = 0) => (xs = {}) => Object.keys(xs).filter(x => o[x] > n);

const compose = (...functions) => (args) => functions.reduceRight((arg, fn) => fn(arg), args);

module.exports = {
      listProduct
    , isEqual
    , getInputArrays
    , getPairs
    , countPairs
    , groupUniquePairs
    , pairsAboveThreshold
    , compose
};
