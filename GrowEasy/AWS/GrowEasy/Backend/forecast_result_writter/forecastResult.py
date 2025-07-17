import boto3
import csv
import io
from datetime import datetime, timedelta

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

# Define table and bucket details
TABLE_NAME = 'ProductAnalytics'
BUCKET_NAME = 'groweasy-forecast-data'
S3_KEY = 'training-data/products.csv'

def lambda_handler(event, context):
    table = dynamodb.Table(TABLE_NAME)

    # Scan all records (consider pagination if dataset is huge)
    response = table.scan()
    items = response.get('Items', [])

    # Prepare CSV in memory
    csv_buffer = io.StringIO()
    writer = csv.writer(csv_buffer)
    writer.writerow(['timestamp', 'product_id', 'total_orders'])  # Header

    for item in items:
        ts = item.get('timestamp')
        pid = item.get('product_id')
        orders = item.get('total_orders', 0)

        if ts and pid:
            writer.writerow([ts, pid, orders])

    # Upload CSV to S3
    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=S3_KEY,
        Body=csv_buffer.getvalue()
    )

    return {
        'statusCode': 200,
        'body': f'Successfully uploaded to s3://{BUCKET_NAME}/{S3_KEY}'
    }
