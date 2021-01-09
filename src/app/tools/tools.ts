export function session (target: Object, method: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any){
    return fetch('http://localhost:5000/session').then(data=>{
      console.log(data);
      return originalMethod.apply(this, args);
    })
  }
}

export function log (target: Object, method: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function(...args: any){
    console.log(JSON.stringify(args));
    let returnValue = originalMethod.apply(this, args);
    console.log(`${method}, ${JSON.stringify(args)} => ${returnValue}`)
    return returnValue;
  }
}
