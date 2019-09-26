const express = require('express')
const app = express()

app.use(express.json());

const arr=[];

app.get('/', function (req, res) {
	res.send('hello world')
});

app.get('/show/:id',function(req,res){
	const val=arr.find(c => c.id===parseInt(req.params.id))
	if(!val) res.status(404).send('sorry couldnt found this file')
	res.send(val)
	console.log(arr);
});
app.post('/add/:id',function(req,res){
	const val=arr.find(c => c.id===parseInt(req.params.id))
	if(!val && arr.length>0)
	{	
		console.log("the file aldready exists....");
		res.status(404).send('sorry the file already exists');
	}
	else
	{
		const add={id:arr.length+1,name:req.body.name,gerne:req.body.gerne,release_date:req.body.release_date,release_area:req.body.release_area}
		arr.push(add);
		res.send(add);
	}
	console.log(arr);
})
app.put('/update/:id',function(req,res){
	const val=arr.find(c => c.id===parseInt(req.params.id))
	if(!val) res.status(404).send('sorry couldnt found this file')
	val.name=req.body.name;
	val.gerne=req.body.gerne;
	val.release_date=req.body.release_date;
	val.release_area=req.body.release_area;

	for (i=0;i<arr.length;i++)
	{
		if(arr[i].id==val.id)
		{
			arr[i]=val;
		}
	}
	res.send(arr);
	console.log(arr);
})

app.delete('/delete/:id',function(req,res){
	const val=arr.find(c => c.id===parseInt(req.params.id))
	if(!val) res.status(404).send('sorry couldnt found this file')
	for (i=0;i<arr.length;i++)	
	{
			if(arr[i].id==val.id)
			{
				var k=arr.splice(parseInt(val.id)-1,1);
				break;
			}
	}
	console.log(arr);
});
app.listen('3000',function(){ console.log("server started")});