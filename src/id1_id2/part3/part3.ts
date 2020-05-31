function* gen1(){
    yield 3;
    yield 6;
    yield 9;
    yield 12;
}

function* gen2() {
    yield 8;
    yield 10;
}

function* braid<T1,T2>(generator1: Generator<T1>, generator2: Generator<T2>){
    let curr1 = generator1.next()
    let curr2 = generator2.next()
    while(!curr1.done || !curr2.done) {
        if (!curr1.done) {
            yield curr1.value
            curr1 = generator1.next()
        } if(!curr2.done){
            yield curr2.value
            curr2 = generator2.next()
        }
    }
}

for (let n of braid(gen1(),gen2())){
    console.log(n);
}