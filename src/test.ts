const arr:number[] = [1,2,3,4,5]
const large = arr.reduce((max,value)=>{
return max>value?max:value
},0)

const newArr = arr.slice(1,3)
console.log(newArr)
console.log(arr)