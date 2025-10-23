import { generateClient } from 'aws-amplify/data'
import { fetchAuthSession } from 'aws-amplify/auth'

// DynamoDB operations using AWS Amplify
// This uses the authenticated user's credentials from Cognito

export interface DynamoDBItem {
  [key: string]: any
}

class DynamoDBClient {
  private async getCredentials() {
    try {
      const session = await fetchAuthSession()
      return session.credentials
    } catch (error) {
      console.error('Error getting credentials:', error)
      throw new Error('Not authenticated')
    }
  }

  async putItem(tableName: string, item: DynamoDBItem) {
    const credentials = await this.getCredentials()
    
    // Using fetch API to call DynamoDB directly
    const response = await fetch(`https://dynamodb.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        'X-Amz-Target': 'DynamoDB_20120810.PutItem',
      },
      body: JSON.stringify({
        TableName: tableName,
        Item: this.marshallItem(item),
      }),
    })

    if (!response.ok) {
      throw new Error(`DynamoDB PutItem failed: ${response.statusText}`)
    }

    return await response.json()
  }

  async getItem(tableName: string, key: DynamoDBItem) {
    const credentials = await this.getCredentials()
    
    const response = await fetch(`https://dynamodb.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        'X-Amz-Target': 'DynamoDB_20120810.GetItem',
      },
      body: JSON.stringify({
        TableName: tableName,
        Key: this.marshallItem(key),
      }),
    })

    if (!response.ok) {
      throw new Error(`DynamoDB GetItem failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.Item ? this.unmarshallItem(data.Item) : null
  }

  async query(tableName: string, keyConditionExpression: string, expressionAttributeValues: DynamoDBItem) {
    const credentials = await this.getCredentials()
    
    const response = await fetch(`https://dynamodb.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        'X-Amz-Target': 'DynamoDB_20120810.Query',
      },
      body: JSON.stringify({
        TableName: tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: this.marshallItem(expressionAttributeValues),
      }),
    })

    if (!response.ok) {
      throw new Error(`DynamoDB Query failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.Items ? data.Items.map((item: any) => this.unmarshallItem(item)) : []
  }

  async deleteItem(tableName: string, key: DynamoDBItem) {
    const credentials = await this.getCredentials()
    
    const response = await fetch(`https://dynamodb.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        'X-Amz-Target': 'DynamoDB_20120810.DeleteItem',
      },
      body: JSON.stringify({
        TableName: tableName,
        Key: this.marshallItem(key),
      }),
    })

    if (!response.ok) {
      throw new Error(`DynamoDB DeleteItem failed: ${response.statusText}`)
    }

    return await response.json()
  }

  // Helper methods to convert between JS objects and DynamoDB format
  private marshallItem(item: DynamoDBItem): any {
    const marshalled: any = {}
    for (const [key, value] of Object.entries(item)) {
      marshalled[key] = this.marshallValue(value)
    }
    return marshalled
  }

  private marshallValue(value: any): any {
    if (value === null || value === undefined) {
      return { NULL: true }
    }
    if (typeof value === 'string') {
      return { S: value }
    }
    if (typeof value === 'number') {
      return { N: value.toString() }
    }
    if (typeof value === 'boolean') {
      return { BOOL: value }
    }
    if (Array.isArray(value)) {
      return { L: value.map(v => this.marshallValue(v)) }
    }
    if (typeof value === 'object') {
      return { M: this.marshallItem(value) }
    }
    return { S: String(value) }
  }

  private unmarshallItem(item: any): DynamoDBItem {
    const unmarshalled: DynamoDBItem = {}
    for (const [key, value] of Object.entries(item)) {
      unmarshalled[key] = this.unmarshallValue(value)
    }
    return unmarshalled
  }

  private unmarshallValue(value: any): any {
    if (value.NULL) return null
    if (value.S !== undefined) return value.S
    if (value.N !== undefined) return parseFloat(value.N)
    if (value.BOOL !== undefined) return value.BOOL
    if (value.L) return value.L.map((v: any) => this.unmarshallValue(v))
    if (value.M) return this.unmarshallItem(value.M)
    return null
  }
}

export const dynamoDBClient = new DynamoDBClient()
