var express = require('express');
var router = express.Router();

// model import
var data = require('../models/data');

/* GET uregister page. */
router.get('/register', function(req, res, next) {
  res.render('user/register');
});

router.post('/register',async(req, res, next)=>{
  // create a new contact
  var contact = new data({
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone
  })
  console.log(contact);
  

  // cheak phone number is already exist or not

  await data.findOne({ phone: req.body.phone })
    .then(data =>{
      if (data){
        return res.redirect('/users/register');
      }else{
       
        contact.save()
        .then(data=>{
          return res.redirect('/');
        })
        .catch(e=>{
          console.log(e)
          return res.redirect('/users/register');
        })
      }
    })
})

// table listing
router.get('/list',(req,res,next)=>{
  data.find()
  .then((user)=>{
    res.render('user/list',{user : user});
  })
  .catch((e)=>{
    console.log(e)
    res.redirect('/')
  })
})

router.get('/delete/:id',(req,res,next)=>{
  var userId = req.params.id
  data.deleteOne({ _id: userId })
  .then(
    res.redirect('/users/list')
  )
  .catch((e)=>{
    console.log(e)
    res.redirect("/")
  })

})

module.exports = router;
