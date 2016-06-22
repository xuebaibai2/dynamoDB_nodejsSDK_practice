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
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err) {
    if (err) {
        console.error("Unable to delete item. Error JSON: ", JSON.stringify(err, null, 2));
    }else{
        console.log("Delete Item succeeded!");
    }
});