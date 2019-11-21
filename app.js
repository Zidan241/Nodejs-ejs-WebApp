const express = require('express')
const session = require('express-session');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs') 

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

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

let getuserwatch = function(name){
    var userwatch=[]
    var watchlist= loadWatchlist()
        for(var i=0; i<watchlist.length; i++){
            if(watchlist[i].user==name)
            userwatch.push(watchlist[i])
        }
    return userwatch
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
    if(req.session.username){
    res.render('home')
    }
    else{
        res.redirect('/login')
    }
})

app.get('/action', function(req,res){
    if(req.session.username){
        res.render('action')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/horror', function(req,res){
    if(req.session.username){
        res.render('horror')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/drama', function(req,res){
    if(req.session.username){
        res.render('drama')
        }
        else{
            res.redirect('/login')
        }
})
app.get('/fightclub', function(req,res){
    if(req.session.username){
        res.render('fightclub', {message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.get('/conjuring', function(req,res){
    if(req.session.username){
        res.render('conjuring', {message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.get('/scream', function(req,res){
    if(req.session.username){
        res.render('scream', {message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.get('/godfather', function(req,res){
    if(req.session.username){
        res.render('godfather', {message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.get('/godfather2', function(req,res){
    if(req.session.username){
        res.render('godfather2', {message:""})
        }
        else{
            res.redirect('/login')
        }
})
app.get('/darkknight', function(req,res){
    if(req.session.username){
        res.render('darkknight',{message:""})
        }
        else{
            res.redirect('/login')
        }   
})

app.get('/watchlist', function(req, res){
    res.render('watchlist', {
        mywatchlist : getuserwatch(req.session.username)
    })
})

app.post('/darkknight',function(req,res){

    var movie = {
        user: req.session.username,
        name:"The Dark Knight (2008)",
        path:"darkknight"
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
        res.render('darkknight',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('darkknight',{message:"This movie has been added to your watchlist"})
    }
    
})

 app.post('/fightclub',function(req,res){

    var movie = {
        user: req.session.username,
        name:"Fight Club (1999)",
        path:"fightclub"
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
        res.render('fightclub',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('fightclub',{message:"This movie has been added to your watchlist"})
    }
    
})

app.post('/conjuring',function(req,res){

    var movie = {
        user: req.session.username,
        name:"The Conjuring (2013)",
        path:"conjuring"
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
        res.render('conjuring',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('conjuring',{message:"This movie has been added to your watchlist"})
    }
    
})    

app.post('/scream',function(req,res){

    var movie = {
        user: req.session.username,
        name:"Scream (1996)",
        path:"scream"
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
        res.render('scream',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('scream',{message:"This movie has been added to your watchlist"})
    }
    
})

app.post('/godfather',function(req,res){

    var movie = {
        user: req.session.username,
        name:"The Godfather (1972)",
        path:"godfather"
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
        res.render('godfather',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('godfather',{message:"This movie has been added to your watchlist"})
    }
    
})

app.post('/godfather2',function(req,res){

    var movie = {
        user: req.session.username,
        name:"The Godfather: Part II (1974)",
        path:"godfather2"
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
        res.render('godfather2',{message:"This movie is already in your watchlist"})
    }
    else{
        addMovie(movie)
        res.render('godfather2',{message:"This movie has been added to your watchlist"})
    }
    
})

var movies=[{path:'darkknight',name:'The Dark Knight (2008)'},{path:'fightclub',name:'Fight Club (1999)'},{path:'conjuring',name:'The Conjuring (2013)'},{path:'scream',name:'Scream (1996)'},{path:'godfather',name:'The Godfather (1972)'},{path:'godfather2',name:'The Godfather: Part II (1974)'}]

app.post('/search',function(req,res){
    var str = req.body.Search
    var sentarr=[]
    var flag = false
    for(var i = 0 ; i<movies.length ; i++){
        var str1 = movies[i].name.toLocaleLowerCase()
        var str2 = movies[i].path
        var searchItem = str.toLocaleLowerCase()
        if(str1.includes(searchItem) || str2.includes(searchItem)){
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
                req.session.username=user_name
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
        setTimeout(function(){res.redirect('/login')} , 3000);
    }
})


var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server is running on port 3000')
})