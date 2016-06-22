var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big Bang Theory";

var params = {
    TableName: table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot = :p, info.actors = :a",
    ExpressionAttributeValues:{
        ":r":0,
        ":p":"麻辣鸡丝",
        ":a":["Larry","Move","Curly"]
    },
    //The return values parameter instructs DynamoDB to return only the updated attributes "UPDATED_NEW"
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item");

docClient.update(params,function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON: ", JSON.stringify(err, null, 2));
    } else{
        console.log("UpdateItem succeeded: ", JSON.stringify(data, null, 2));
    }
});