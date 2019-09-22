const express = require('express')
const app = express()

app.use(express.json());

app.get('/',function(req,res)
{
	res.send("hello vedha krishna")
});

app.get('/about/:title/:topic/:discription',function(req,res)
{
	res.send(req.params);
});

app.listen(3000,function(){console.log('Server Started Successfully')})