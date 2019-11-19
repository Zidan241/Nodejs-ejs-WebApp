const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs') 

var curruser = null

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

let loadWatchlist = function(){
    try {
        let bufferedData = fs.readFileSync('watchlist.json')
        let dataString = bufferedData.toString()
        let watchlistArray = JSON.parse(dataString)
        return watchlistArray
    } catch (error) {
        return []
    }
}

let addMovie = function(movie){
    let watchlistArray = loadWatchlist()
    watchlistArray.push(movie)
    fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))
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

app.get('/home', function(req,res){
    if(curruser!=null){
    res.render('home')
    }
    else{
        res.redirect('/login')
    }
})

app.get('/action', function(req,res){
    if(curruser!=null){
        res.render('action')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/horror', function(req,res){
    if(curruser!=null){
        res.render('horror')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/drama', function(req,res){
    if(curruser!=null){
        res.render('drama')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/fightclub', function(req,res){
    if(curruser!=null){
        res.render('fightclub')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/conjuring', function(req,res){
    if(curruser!=null){
        res.render('conjuring')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/scream', function(req,res){
    if(curruser!=null){
        res.render('scream')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/godfather', function(req,res){
    if(curruser!=null){
        res.render('godfather')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/godfather2', function(req,res){
    if(curruser!=null){
        res.render('godfather2')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/darkknight', function(req,res){
    if(curruser!=null){
        res.render('darkknight',{message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.post('/darkknight',function(req,res){

    var movie = {
        user:curruser,
        name:"darkKnight"
    }
    var watchlistArray = loadWatchlist()
    var found = false
    for(var i=0 ; i<watchlistArray.length ;i++){
        if(watchlistArray[i].user == movie.user && watchlistArray[i].name == movie.name){
            found = true
            break;
        }
    }
    if(found){
        res.render('darkknight',{message:"movie already in your Watchlist"})
    }
    else{
        addMovie(movie)
        res.render('darkknight',{message:""})
    }
    
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
                curruser=user_name
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