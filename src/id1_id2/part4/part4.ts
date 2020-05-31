

const g = (x:number):number=> x*x;
const f = (x:number):number=> 1/x;

const h =  (x:number):Promise<number>=> {
    return new Promise<number>((resolve, reject)=>{
        return f(g(x))
    })
}
const prom = h(6)
const k = Promise.resolve(prom.then((num:number)=>console.log("Success: "+num)))
prom.catch((err)=>console.error(err))
setTimeout(()=>"9",5000);





