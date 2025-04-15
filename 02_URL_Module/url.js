let url=require('url');
let add='http://localhost:4000/default.html?year=2017&month=february';
let q = url.parse(add,true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let qdata=q.query;
console.log(qdata.month);