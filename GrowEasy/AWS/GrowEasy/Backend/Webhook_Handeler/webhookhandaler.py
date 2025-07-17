import json
import logging
import boto3
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GrowEasyWebhookLogs')  # Ensure table has "id" as partition key

def lambda_handler(event, context):
    try:
        logger.info("Received Event: %s", json.dumps(event))

        body = event.get('body', '{}')
        if isinstance(body, str):
            body = json.loads(body)

        logger.info("Parsed Body: %s", json.dumps(body))

        product_id = str(body.get("id"))
        title = body.get("title")
        variants = body.get("variants", [])
        price = variants[0].get("price", "0") if variants else "0"
        inventory = variants[0].get("inventory_quantity", 0) if variants else 0
        timestamp = datetime.utcnow().isoformat()

        # Store in DynamoDB
        table.put_item(Item={
            "id": product_id,
            "title": title,
            "inventory": inventory,
            "price": price,
            "timestamp": timestamp
        })

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Stored to DynamoDB",
                "product_id": product_id
            })
        }

    except Exception as e:
        logger.error("Error: %s", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
