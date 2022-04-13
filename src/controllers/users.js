
const node_fetch = require('node-fetch')

const getItems =  (req, res) => {
     node_fetch('https://jsonplaceholder.typicode.com/users')
    .then(r=>r.json())
    .then(data=> res.json(data))
}

module.exports=getItems