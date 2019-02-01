const bcrypt     = require("bcrypt");
const saltRounds = 1;

const plainPassword1 = "HelloWorld";
const plainPassword2 = "HelloWorld";

//complexifier
const salt  = bcrypt.genSaltSync(saltRounds);
const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

console.log(salt)

console.log("Hash 1 -", hash1);
console.log("Hash 2 -", hash2);

console.log(bcrypt.compareSync("HelloWorld2", hash1))