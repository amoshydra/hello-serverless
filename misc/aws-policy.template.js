const output = (([
  awsAccountId = process.env.AWS_ACCOUNT_ID || '<awsAccountId>',
  serverlessServiceName = process.env.SERVERLESS_SERVICE_NAME || '<serverlessServiceName>',
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
      Resource: `arn:aws:logs:*:${awsAccountId}:log-group:/aws/lambda/${serverlessServiceName}-${serverlessStage}*`
    },
    {
      Action: [
        'logs:DescribeLogGroups',
        'logs:DescribeLogStreams'
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
      Resource: `arn:aws:s3:::${ `${serverlessServiceName}-${serverlessStage}`.substring(0, 22) }-serverlessdeploymentbucket*`
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
        `arn:aws:cloudformation:*:${awsAccountId}:changeset/${serverlessServiceName}-${serverlessStage}/*`,
        `arn:aws:cloudformation:*:${awsAccountId}:stack/${serverlessServiceName}-${serverlessStage}/*`
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
      Resource: `arn:aws:iam::${awsAccountId}:role/${serverlessServiceName}-${serverlessStage}*`
    },
    {
      Effect: 'Allow',
      Action: [
        'lambda:*'
      ],
      Resource: [
        `arn:aws:lambda:*:${awsAccountId}:function:${serverlessServiceName}-${serverlessStage}*`,
        `arn:aws:lambda:*:${awsAccountId}:layer:${serverlessServiceName}-${serverlessStage}*`
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
