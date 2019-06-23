const output = (([
  awsAccountId = process.env.AWS_USER_ID || '<awsAccountId>',
  stackName = process.env.STACK_NAME || '<stackName>',
  serverlessStage = process.env.SERVERLESS_STAGE || '<serverlessStage>'
]) => ({
  Version: '2012-10-17',
  Statement: [
    {
      Action: [
        'logs:CreateLogGroup',
        'logs:DeleteLogGroup',
        'logs:FilterLogEvents',
        'logs:GetLogEvents'
      ],
      Effect: 'Allow',
      Resource: `arn:aws:logs:*:${awsAccountId}:log-group:/aws/lambda/${stackName}-${serverlessStage}*`
    },
    {
      Action: [
        'logs:DescribeLogGroups'
      ],
      Effect: 'Allow',
      Resource: `arn:aws:logs:*:${awsAccountId}:log-group:*`
    },
    {
      Effect: 'Allow',
      Action: [
        's3:CreateBucket',
        's3:DeleteBucket',
        's3:DeleteBucketPolicy',
        's3:DeleteObject',
        's3:DeleteObjectVersion',
        's3:GetObject',
        's3:GetObjectVersion',
        's3:ListAllMyBuckets',
        's3:ListBucket',
        's3:PutBucketNotification',
        's3:PutBucketPolicy',
        's3:PutBucketTagging',
        's3:PutBucketWebsite',
        's3:PutEncryptionConfiguration',
        's3:PutObject'
      ],
      Resource: `arn:aws:s3:::${stackName}-${serverlessStage}-serverlessdeploymentbucket*`
    },
    {
      Effect: 'Allow',
      Action: [
        'cloudformation:CancelUpdateStack',
        'cloudformation:ContinueUpdateRollback',
        'cloudformation:CreateChangeSet',
        'cloudformation:CreateStack',
        'cloudformation:CreateUploadBucket',
        'cloudformation:DeleteStack',
        'cloudformation:Describe*',
        'cloudformation:EstimateTemplateCost',
        'cloudformation:ExecuteChangeSet',
        'cloudformation:Get*',
        'cloudformation:List*',
        'cloudformation:PreviewStackUpdate',
        'cloudformation:UpdateStack',
        'cloudformation:UpdateTerminationProtection'
      ],
      Resource: [
        `arn:aws:cloudformation:*:${awsAccountId}:changeset/${stackName}-${serverlessStage}/*`,
        `arn:aws:cloudformation:*:${awsAccountId}:stack/${stackName}-${serverlessStage}/*`
      ]
    },
    {
      Effect: 'Allow',
      Action: [
        'cloudformation:ValidateTemplate'
      ],
      Resource: '*'
    },
    {
      Effect: 'Allow',
      Action: [
        'iam:CreateRole',
        'iam:DeleteRole',
        'iam:DeleteRolePolicy',
        'iam:GetRole',
        'iam:PassRole',
        'iam:PutRolePolicy'
      ],
      Resource: `arn:aws:iam::${awsAccountId}:role/${stackName}-${serverlessStage}*`
    },
    {
      Effect: 'Allow',
      Action: [
        'lambda:*'
      ],
      Resource: [
        `arn:aws:lambda:*:${awsAccountId}:function:${stackName}-${serverlessStage}*`,
        `arn:aws:lambda:*:${awsAccountId}:layer:${stackName}-${serverlessStage}*`
      ]
    },
    {
      Action: [
        'apigateway:*'
      ],
      Effect: 'Allow',
      Resource: '*'
    }
  ]
}))(process.argv.slice(2))

const json = JSON.stringify(output, null, 2);
console.log(json);