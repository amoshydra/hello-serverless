# Hello Serverless
A minimum template for an AWS Lambda deployment with Serverless Framework

## Usage

1. Clone repository
2. Create a `.env` file based on the sample `.env.sample`
   - This example uses AWS Access ID and Access Key.  
     You may also use a different authentication method, see: [serverless/credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
   - Populate the rest of the variable in the `.env` file. These variables will be used inside the `serverless.yml` file.
3. Run `yarn`

## Commands
- `yarn deploy`
- `yarn package`
- `yarn teardown`


## Notes
- An example of IAM policy can be generated via `yarn print:aws-policy`. You may attach this policy to the user/group that run the Serverless commands.
- At the moment, the total length of "service name" + "stage" should not exceed 22 characters. Otherwise, the generated bucket name may not match the S3 resource defined in the generated policy.


## License
[MIT](https://choosealicense.com/licenses/mit/)
