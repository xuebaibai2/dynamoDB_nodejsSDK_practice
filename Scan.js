var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Movies",
    ProjectExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues:{
        ":start_yr": 2014,
        ":end_yr": 2015
    }
};

console.log("Scanning Movie table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err){
        console.log("Unable to scan the table. Error JSON: ", JSON.stringify(err, null, 2));
    }else{
        //Print All movie
        console.log("Scan succeeded");
        data.Items.forEach(function (movie) {
            console.log(movie.year + ": ", movie.title, "- rating:", movie.info.rating);
        });
        //continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Result set exceeds 1 MB \nScanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}