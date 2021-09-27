const bcrypt=require('bcrypt');
async function check(){


const salt=await bcrypt.genSalt(10);
const hashing= await bcrypt.hash('4566',salt);
console.log(salt);
console.log(hashing);
}
check();