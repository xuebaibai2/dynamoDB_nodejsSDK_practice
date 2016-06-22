var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName: "Movies",
    /**
     * Because year is a reserved word in DynamoDB, it is not allowed to use it directly in any expression, including 
     * KeyConditionExpression.
     */
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames: {
        "#yr":"year"
    },
    ExpressionAttributeValues:{
        ":yyyy": 1985
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to query. Error: ", JSON.stringify(err, null, 2));
    }else{
        console.log("Query succeeded");
        data.Items.forEach(function (item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});