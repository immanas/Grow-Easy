import json
import boto3

sns = boto3.client('sns')
sns_topic_arn = 'arn:aws:sns:<your-region>:<your-account-id>:autoshield-alerts'  # Replace this!

def lambda_handler(event, context):
    message = event['detail']
    rule_name = message.get('configRuleName')
    resource_id = message.get('resourceId')
    compliance = message.get('newEvaluationResult', {}).get('complianceType')
    
    alert_message = f"""⚠️ AutoShield Alert!
Rule: {rule_name}
Resource: {resource_id}
Status: {compliance}
    """
    
    sns.publish(
        TopicArn=sns_topic_arn,
        Message=alert_message,
        Subject="⚠️ AutoShield Violation Detected"
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Alert sent by AutoShield.')
    }
