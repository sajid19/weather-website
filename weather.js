const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/" ,function (req, res) {

  res.sendFile(__dirname + "/index.html") ;

    
});

app.post("/" ,function (req, res) {
    
    const place = req.body.cityName;
    const APIkey = "79d5c7f1e37eef9c56448f52b1199f18";
    const units = "metric";


   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ place +"&appid="+ APIkey+ "&units="+ units ;

   https.get(url , function(response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
        var weatherdata = JSON.parse(data);
        const des = weatherdata.weather[0].description;
        var temp = weatherdata.main.temp;
        var icon = weatherdata.weather[0].icon;
        var iconurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currrently " + des +  "<p/>");
        res.write("<h1> The temperature in "+ place +" is " + temp + " degree celcius <h1/>");
        res.write("<img src=" + iconurl + ">");
        res.send();
        
        
    });
    
});



    
});
















app.listen(3000,function() {
    console.log("Server is running on 3000");
    
})