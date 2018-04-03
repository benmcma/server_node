// when using heroku the port number changes, so we can't have a static port number on //1 so we use an environment varibale whcih
//changes the port
//to check the environemnt varibale type: 'SET' in windows or 'env' in linux or os
//we can see info such as: USERNAME=B
//USERPROFILE=C:\Users\B
const express =require("express");
const hbs =require('hbs');
const fs = require('fs');
const port=process.env.PORT|| 3000; //environment variable is in the 'process' object, so we use : process.env.PORT , this is for when the
                        //the server is running on the local host we have only the static port (3000 here), so we use ||
                        //now we go to package.json, and under "scripts/test" we add : "start" : "node.server.js", thats because heroku doesn't
                        //know which file to start, so we add a script to specify that
                    //to run the app type: npm start
                    //to test type : npm test

var app = express();


hbs.registerPartials(__dirname+ "/views/partials"); 

app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public')); 



app.use((req, res,next )=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
   fs.appendFile('server.log',log + '\n', (err)=>{
       if(err)
       {
           console.log("unable to append to server log");
       }
   }); 

    next(); 
});


//we add a meintenance.hbs to in the views folder 
app.use((req, res, next)=>{
    res.render('maintenance.hbs'); //passing the file that we want to render
    
});


//*******************
app.get("/", (req, res)=>{ 
    res.render("home.hbs", {
        pageTitle: "Home page",
        WelcomeMessage: "welcome to my website",
        currentYear : new Date().getFullYear()
    });
});

app.get("/about", (req, res)=>{
    res.render('about.hbs', {
        pageTitle: "About page",
        currentYear : new Date().getFullYear()
    }); 
});

app.get("/bad", (req, res)=>{
   res.send( {errorMessage : "unable to handle request "}); 
    
});

app.listen(port, ()=>{  //1
    console.log(`server is on port ${port}`);
}); 