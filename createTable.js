var AWS = require('aws-sdk');

AWS.config.update({
	region: "us-west-2",
	endpoint: "http://localhost:8000"
	});
	
var dynamodb = new AWS.DynamoDB();

var params = {
	TableName : "Movies",
	KeySchema: [
		{ AttributeName: "year", KeyType: "HASH"},
		{ AttributeName: "title", KeyType: "RANGE"}
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	},
	AttributeDefinitions: [
		{AttributeName: "year", AttributeType: "N"},
		{AttributeName: "title", AttributeType: "S"}
	]
	
};

var dropParams = {
	TableName : "Movies"
}

dynamodb.createTable(params, function(err, data){
	if(err){
		console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
	} else{
		console.log("Created table. Table description JSON: ", JSON.stringify(data, null, 2));
	}
});
