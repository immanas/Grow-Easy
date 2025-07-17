import requests
import json

store_name = "groweasytest.myshopify.com"  # ✅ Your Shopify store URL
access_token = "shpat_XXXXXXXXXXXXXXXXXXXXXXXXXXXX"  # ✅ Your private app access token
webhook_url = "https://ehsc93gdnb.execute-api.ap-south-1.amazonaws.com/prod/webhook"  # Your API Gateway endpoint
webhook_payload = {
    "webhook": {
        "topic": "products/update",  
        "address": webhook_url,
        "format": "json"
    }
}
response = requests.post(
    f"https://{store_name}/admin/api/2023-04/webhooks.json",
    headers={
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": access_token
    },
    data=json.dumps(webhook_payload)
)

#Output
if response.status_code == 201:
    print("✅ Webhook created successfully!")
    print(json.dumps(response.json(), indent=2))
else:
    print("❌ Failed to create webhook")
    print(response.status_code, response.text)
