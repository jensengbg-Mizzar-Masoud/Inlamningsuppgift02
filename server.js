const express = require('express');
const app = express();
const port = process.env.PORT || 1010 ;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);

function checkDb () {
    let boolean = database.has('Balls').value();

    if (!boolean){
        database.defaults({ Balls: [], korg: []}).write();
    }
}

app.use(express.static('public'));


app.get('/balls', (req, res) =>{
    let product = database.get('Balls').value();
    res.send(product);
});

app.post('/balls/add', (req, res) => {
    let id = req.query.id;
    let product = database.get('Balls').find({ id: id}).value();
    let checkValue = database.get('korg').find({ id: id}).value();
    
    if ( checkValue == undefined) {
        database.get('korg').push(product).write();
        res.send({message: 'Product Sent'});
    } else {
        res.send({message: 'Product Already existe '});
    }

});

app.delete('/balls/remove', (req, res) => {
let id = req.query.id;
let product = database.get('korg').find({id: id}).value();
if (product == undefined) {
    res.send({message: 'Product Not Found'});
}else{
    database.get('korg').remove({id: id}).write();
    res.send({message: 'Product removed'});
}
});

app.get('/korg', (req, res) => {
    let korg = database.get('korg').value();
    res.send(korg);
})


app.listen(port, () => {
    checkDb();
    console.log('listening')
});

