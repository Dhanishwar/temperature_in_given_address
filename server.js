// var express = require("express");
// var app = express();
// app.listen(3000,()=>{        //192.168.92.50:3000
// 	console.log("Server is up and running");  
// })
// app.get('/', (req,res)=>{  //it constantly waits for a get request and when it gets the request, funtion runs
// 		 				// all request will be stored in req, all respond will be stored in res
// res.send('<h1>HELLO WORLD<h1>')
// })

const yargs=require('yargs')
const request=require('request')
var argv = yargs
	.options(
	{
		a:{
			demand :true,
			describe : 'Address to fetch weather',
			string: true
			}
	})
	.help()
	.alias('help','h')
	.argv
	// console.log(argv);
	const key = "AIzaSyDDxRX1qc5QZDN_KVXS1ehxVoTu35c7Wvo";
	var adr = encodeURIComponent(argv.a);
    var url= `https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=${key}` //we use the symbol above tilda to avoid storing the whole url as string
    var lat;
    var lon;
    request({
    	url:url,
    	json:true // here comma is not needed bcoz it points the end of json
    }, (error,response,body)=>{

    	if(body.status === "OK"){
    		lat = body.results[0].geometry.location.lat;
    		lon = body.results[0].geometry.location.lng;

    		 var _url = `https://api.darksky.net/forecast/5cb0006fbfd3afc6601097b7fd532438/${lat},${lon}`
    request({
    	url: _url,
    	json:true // here comma is not needed bcoz it points the end of json
    }, (err,res,bod)=>{

    	var temp=bod.currently.temperature;
    	console.log(temp)
    })
    		console.log(lat+" "+lon);
    	}
    })
   

    //console.log(url)