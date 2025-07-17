const { DynamoDBClient, ScanCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "ap-south-1" });

exports.handler = async (event) => {
  try {
    // Scan existing products from GrowEasyWebhookLogs table
    const scanCommand = new ScanCommand({ TableName: "GrowEasyWebhookLogs" });
    const scanResult = await client.send(scanCommand);
    const items = scanResult.Items || [];

    // Extract and validate price data
    let validPrices = items
      .map(item => parseFloat(item.price?.N))
      .filter(val => !isNaN(val));

    const totalProducts = items.length;
    const lowStockProducts = items.filter(
      item => parseInt(item.inventory?.N) < 10
    ).length;

    const totalPrice = validPrices.reduce((sum, price) => sum + price, 0);
    const averagePrice = validPrices.length > 0
      ? (totalPrice / validPrices.length).toFixed(2)
      : "0";

    // Prepare summary item for ProductAnalytics table
    const summary = {
      total_products: { N: totalProducts.toString() },
      low_stock_products: { N: lowStockProducts.toString() },
      average_price: { N: averagePrice.toString() },
      timestamp: { S: new Date().toISOString() },
    };

    const putCommand = new PutItemCommand({
      TableName: "ProductAnalytics",
      Item: summary,
    });

    await client.send(putCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Analytics stored", summary }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
