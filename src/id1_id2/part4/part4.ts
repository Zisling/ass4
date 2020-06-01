
const g = (x:number):Promise<number>=> {
    return new Promise<number>((resolve, reject)=>
    {
            resolve(x*x)
    })
};
const f = (x:number):Promise<number>=> {
    return new Promise<number>((resolve, reject)=>{
        if(x === 0){
            reject("Error: Division by zero")
        }
        else
            resolve(1/x)
    })
}

const h =  (x:number):Promise<number>=> {
    return new Promise<number>((resolve, reject)=>{
        g(x).then((num:number)=>f(num)).then((num:number)=>
        {
            resolve(num)
        }).catch((err)=>reject(err))
    })
}
const prom = h(0)
prom.then((num:number)=>console.log("Success: "+num)).catch((err)=>console.log(err))



const slower = <T>(arr:(Promise<T>)[])=>
    new Promise<[number,T]>((resolve, reject) => {
        let end_array:T[] = [];
        for (const promise of arr) {
            promise.then(res=>end_array.push(res)).then(()=>{
                if (arr.length===end_array.length)
                {resolve([arr.indexOf(promise),end_array[arr.length-1]])}
            }).catch(err=>reject(err))
        }
})
const exmpro = new Promise((resolve,reject)=>setTimeout(resolve,10,"1"))
const exmpro2 = new Promise((resolve,reject)=>setTimeout(resolve,10,"2"))
const prom2 = slower([exmpro2,exmpro]);
prom2.then(x=>console.log(x));