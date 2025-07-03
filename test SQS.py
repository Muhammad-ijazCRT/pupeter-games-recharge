import boto3
import json

def send_sqs_message(queue_url: str, message_body: dict, message_group_id: str = None):
    """
    Sends a message to an SQS queue.

    Args:
        queue_url: The URL of the SQS queue.
        message_body: The message payload (must be a JSON-serializable dict).
        message_group_id: (Optional) The MessageGroupId for FIFO queues.
    Returns:
        The SQS MessageId if successful, None otherwise.
    """

    sqs_client = boto3.client(
        'sqs',
        region_name='us-east-2',  # Hardcoded AWS region
        aws_access_key_id='AKIAQGYBPWGXST6CPWQN',  # Hardcoded access key
        aws_secret_access_key='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',  # Hardcoded secret key
    )
    try:
        if message_group_id:
            response = sqs_client.send_message(
                QueueUrl=queue_url,
                MessageBody=json.dumps(message_body),
                MessageGroupId=message_group_id  # Required for FIFO queues
            )
        else:
            response = sqs_client.send_message(
                QueueUrl=queue_url,
                MessageBody=json.dumps(message_body)
            )

        return response.get('MessageId')
    except Exception as e:
        print(f"Error sending SQS message: {e}")
        return None


if __name__ == "__main__":
    queue_url = 'https://sqs.us-east-2.amazonaws.com/014498640303/ULTRA-PANDA'  # Hardcoded queue URL

    # Construct the ReqGroupGameDTO
    message_data = {
        '_id': 'unique_id_for_ultra_panda_account',
        'game': 'Ultra Panda',
        'type': 'CREATE_ACCOUNT',
        'data': {
            'username': 'fi'
        }
    }

    message_id = send_sqs_message(queue_url, message_data)

    if message_id:
        print(f"Successfully sent message to {queue_url}, MessageId: {message_id}")
    else:
        print("Failed to send message.")
