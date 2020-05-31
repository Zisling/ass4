
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





