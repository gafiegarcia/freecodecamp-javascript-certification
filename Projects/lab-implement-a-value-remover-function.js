console.log("— Value Remover Function —\n");

function destroyer(array, ...arg) {
  return array.filter(value => !arg.includes(value));
}

console.log("destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3):")
console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3))
console.log()

console.log(`destroyer( ["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan" ):`)
console.log(destroyer( ["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan" ))

// review from gpt-5.5
// If you wanted a slightly more elegant naming improvement, I’d maybe rename arg 
// to something plural/semantic:                                                 
                                                                                
//  ```js                                                                          
//    function destroyer(array, ...valuesToRemove) {                               
//      return array.filter(value => !valuesToRemove.includes(value));             
//    }                                                                            
//  ```                                                                            