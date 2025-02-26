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

function* braid<T1,T2>(generator1: ()=>Generator<T1>, generator2:()=>Generator<T2>){
    const gen1:Generator<T1> = generator1()
    const gen2:Generator<T2> = generator2()
    let curr1 = gen1.next()
    let curr2 = gen2.next()
    while(!curr1.done || !curr2.done) {
        if (!curr1.done) {
            yield curr1.value
            curr1 = gen1.next()
        } if(!curr2.done){
            yield curr2.value
            curr2 = gen2.next()
        }
    }
}

function* biased<T1,T2>(generator1: ()=>Generator<T1>, generator2:()=>Generator<T2>){
    const gen1:Generator<T1> = generator1()
    const gen2:Generator<T2> = generator2()
    let curr1 = gen1.next()
    let curr2 = gen2.next()
    while(!curr1.done || !curr2.done) {
        if (!curr1.done) {
            yield curr1.value
            curr1 = gen1.next()
            if(!curr1.done)
            {
                yield curr1.value
                curr1 = gen1.next()
            }
        } if(!curr2.done){
            yield curr2.value
            curr2 = gen2.next()
        }
    }
}

function* take(n: number, generator:Generator) {
for (let v of generator){
    if (n <= 0 ) return;
    n--;
    yield v;
}
}

for (let n of take(6,biased(gen1,gen2))){
    console.log(n);
}