var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Update the item, unconditionally,

var params = {
    TableName:table,
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr":"year"
    },
    ExpressionAttributeValues:{
        ":yyyy":2000
    }
};

docClient.query(params, function(err, data) {
   if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});