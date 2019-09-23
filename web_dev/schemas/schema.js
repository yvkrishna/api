const graphql=require('graphql');
const _=require('lodash');
const { GraphQLObjectType ,
		GraphQLString ,
		GraphQLSchema ,
		GraphQLID ,
		GraphQLInt ,
		GraphQLList}=graphql;


var mongojs = require('mongojs')
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/chatbot?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["messages"],["msg"]);

// var books=[
// 	{name:'programming in c',genre:'education',id:'1',authorid:'1'},
// 	{name:'programming in python',genre:'education',id:'2',authorid:'1'},
// 	{name:'programming in javascript',genre:'education',id:'3',authorid:'1'},
// 	{name:'chemistry problems',genre:'education',id:'4',authorid:'2'},
// 	{name:'physics problems',genre:'education',id:'5',authorid:'2'},
// 	{name:'maths problems',genre:'education',id:'6',authorid:'2'},
// 	{name:'the gaint',genre:'education',id:'7',authorid:'3'},
// 	{name:'english questions',genre:'education',id:'8',authorid:'2'}
// ];

// var authors=[
// 	{name:'balaguru swamy',age:56,id:'1',style:'programming'},
// 	{name:'himanshu pandey',age:66,id:'2',style:'chemistry'},
// 	{name:'aminish',age:42,id:'3',style:'story book'}
// ];

const BookType= new GraphQLObjectType({
	name:"Book",
	fields:()=>({
		id: {type: GraphQLID},
		name : {type:GraphQLString},
		genre: {type:GraphQLString},
		author:{
			type:AuthorType,
			resolve(parent,args)
			{
			 		return _.find(authors,{id:parent.authorid});
			}
		}
	})
});

const AuthorType= new GraphQLObjectType({
	name:"Author",
	fields:()=>({
		id: {type: GraphQLID},
		name : {type:GraphQLString},
		age: {type:GraphQLInt},
		style: {type:GraphQLString},
		books:{
			type:new GraphQLList(BookType),
			resolve(parent,args){
				return _.filter(books,{authorid:parent.id})
			}
		}
	})
});


const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		book:{
			type:BookType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				// code to get the data from database 
				return _.find(books,{id:args.id})
			}
		},
		author:{
			type:AuthorType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return _.find(authors,{id:args.id})
			}
		}
	}
});

const Mutation =new GraphQLObjectType({
	name:"Mutation",
	fields:{
		addauthor:{
			type:AuthorType,
			args:{
				name:{ type:GraphQLString },
				age:{ type:GraphQLInt },
				style:{ type:GraphQLString }
			},
			resolve(parent,args){
				let author ={
					name:args.name,
					age:args.age,
					style:args.style
				}
				db.messages.insert(author,function(err,data){
					if(err)
					{
						console.log(err);
					} 
					else
					{
						console.log('data has been stored to authors');
					}
				});
				return author;
			}
		},
		addbook:{
			type:BookType,
			args:{
				name:{ type:GraphQLString },
				gerne:{ type:GraphQLString },
				authorid:{ type:GraphQLString }
			},
			resolve(parent,args){
				let book={
					name:args.name,
					gerne:args.gerne,
					authorid:args.authorid
				}
				db.msg.insert(book,function(err,data){
					if(err)
					{
						console.log(err);
					} 
					else
					{
						console.log('data has been stored to books');
					}
				});
				return book;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query:RootQuery,
	mutation:Mutation
});
