var telegram= require("telegram-bot-api");
var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/practice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["places"]);
var api = new telegram({
        token: '874332695:AAHx-LrkwdDXLA6cAwsICWwXM_QHkiZim2U',
        updates: {
        	enabled: true
    }
});
api.on('message', function(message)
{
	var text=message.text.toLowerCase()
	var list=text.split(" ")
	if(list[2]=="add")
	{
		objects={
			name:list[0],
			crop:list[1]
		}
		console.log(list)
		db.places.insert(objects,function(err,data)
		{
			api.sendMessage({chat_id:message.chat.id,text:'data has been stored in database'})
		})
	}
	else if (list[0]=="crop" && list[1]=="rate")
	{
		obj={
			crop:list[3].toString()
		}
		console.log(obj);
		db.places.find(obj,function(err,data)
		{
			if(err)
			{
				console.log(err)
			}
			else
			{
				if(data.length>0)
				{
					api.sendMessage({chat_id:message.chat.id,text:'Number of '+ obj.crop+' are '+data.length.toString()})
				}
			}
		})
	}

	else if (text="show all crops")
	{
		new_obj={}
		db.places.find(new_obj,function(err,data)
		{
			if(err)
			{
				console.log(err)
			}
			else
			{
				if(data.length>0)
				{
					let result = data.map(a => a.crop);
					var uniqueArray = [...new Set(result)]
					var datastore = Array.from(Array(uniqueArray.length), () => 0)
					var user='There are \n'
					for(i=0;i<uniqueArray.length;i++)
					{
						var input=uniqueArray[i].toString();
						for(j=0;j<result.length;j++)
						{
							if(input==result[j])
							{
								datastore[i]=datastore[i]+1
							}
						}
					}
					for(i=0;i<uniqueArray.length;i++)
					{
						user=user +uniqueArray[i].toString()+' : '+datastore[i].toString()+'\n';
					}
					console.log(user);
					api.sendMessage({chat_id:message.chat.id,text:user})
				}
			}
		})
	}
	else
	{
		console.log('sorry i didnt get you');
	}
	console.log('completed the above process');
});