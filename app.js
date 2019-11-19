const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: false }))

let loadUsers = function(){
    try {
        let bufferedData = fs.readFileSync('users.json')
        let dataString = bufferedData.toString()
        let usersArray = JSON.parse(dataString)
        return usersArray
    } catch (error) {
        return []
    }
}

let addUser = function(user){
    let users = loadUsers()
    users.push(user)
    fs.writeFileSync('users.json', JSON.stringify(users))
}

app.get('/', function(req,res){
    res.redirect('/login')
})

app.get('/login', function(req,res){
    res.render('login',{message:''})
})

app.get('/registration', function(req,res){
    res.render('registration',{
        users:JSON.stringify(loadUsers())
    })
})

app.get('/home/', function(req,res){
    res.render('home')
})

app.get('/action', function(req,res){
    res.render('action')
})
app.get('/horror', function(req,res){
    res.render('horror')
})
app.get('/drama', function(req,res){
    res.render('drama')
})
app.get('/fightclub', function(req,res){
    res.render('fightclub')
})
app.get('/conjuring', function(req,res){
    res.render('conjuring')
})
app.get('/scream', function(req,res){
    res.render('scream')
})
app.get('/godfather', function(req,res){
    res.render('godfather')
})
app.get('/godfather2', function(req,res){
    res.render('godfather2')
})
app.get('/darkknight', function(req,res){
    res.render('darkknight')
})
app.post('/darkknight',function(req,res){
    console.log('hello')
})    
var movies=['darkknight','fightclub','conjuring','scream','godfather','godfather2']

app.post('/search',function(req,res){
    var str = req.body.Search
    var sentarr=[]
    var flag = false
    for(var i = 0 ; i<movies.length ; i++){
        if(movies[i].includes(str)){
            sentarr.push(movies[i])
            flag=true
        }
    }
    if(!flag){
        res.render('searchresults',{array:[]})  
    }
    else{
        res.render('searchresults',{array:sentarr})  
    }

 
})
app.post('/login',function(req,res){
    var user_name = req.body.username
    var pass = req.body.password
    var users_arr= loadUsers()
    var found= false
    if(user_name==''||pass==''){
        res.render('login',{message:'fields are left empty'})
    }
    else{
    for(var i=0 ; i<users_arr.length;i++){
        if(users_arr[i].username == user_name){
            found=true
            if(users_arr[i].password == pass){
                res.redirect('/home')
            }
            else{
                res.render('login',{message:'wrong password'})
            }
            break;
        }
    }
    if(!found){
        res.render('login',{message:'user does not exsist'})
    }
    }
}) 

app.post('/register',function(req,res){
    var user_name = req.body.username
    var pass = req.body.password

    let user = {
        username: user_name,
        password : pass
    }
    var users_arr = loadUsers();
    var flag = false;
    for(var i = 0 ; i<users_arr.length ; i++){
        if(users_arr[i].username==user_name){
            flag=true;
            break;
        }
    }
    if(!flag && user_name!='' && pass!=''){
        addUser(user);
        setTimeout(function(){res.redirect('/login')} , 5000);
    }
})


var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server is running on port 3000')
})