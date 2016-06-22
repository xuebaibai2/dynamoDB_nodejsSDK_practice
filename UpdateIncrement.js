var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big Bang Theory";

var params ={
    TableName: table,
    Key:{
        "year": year,
        "title": title
    },
    //Update with increment
    UpdateExpression: "set info.rating = info.rating + :val",
    ExpressionAttributeValues:{
        ":val":5
    },
    ReturnValues: "UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON: ", JSON.stringify(err, null, 2));
    }else{
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
