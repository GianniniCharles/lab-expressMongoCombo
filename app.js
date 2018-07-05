const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/items-db');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true})); //this makes bodyParser package work


const itemSchema = new Schema({
  itemName: String,
  itemType: String,
  itemDescription: String
});


const Item = mongoose.model('Item', itemSchema);


app.get('/items', (req, res, next)=>{
  Item.find()
  .then((listOfItems)=>{
    res.render('items',{itemsArray:listOfItems});
  })
  .catch((err)=>{
    res.send(err); //Unprofessional because it shows error to user, but will in testing phase 
  })

})



app.get('/items/:id', (req, res, next)=>{
  const theID = req.params.id

  Item.findById(theID)
  .then((theItem)=>{
    res.render('singleItem', {item: theItem})
  })
  .catch((err)=>{
    res.send(err);
  })
});












app.listen(3000, () => console.log('App listening on port 3000.'))