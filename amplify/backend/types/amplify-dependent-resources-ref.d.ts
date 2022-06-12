export type AmplifyDependentResourcesAttributes = {
    "api": {
        "zipzap": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "ZipZap": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        },
        "userPoolGroups": {
            "AdminGroupRole": "string"
        }
    },
    "storage": {
        "giftbucket": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}