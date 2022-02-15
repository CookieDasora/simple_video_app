import aws from 'aws-sdk';

const s3 = new aws.S3();

class deleteFileFunction {
  async execute(filename: string): Promise<Error | Number> {
    const params = { Bucket: process.env.AWS_BUCKET, Key: filename };

    try {
      await s3.headObject(params).promise();
      try {
        await s3.deleteObject(params).promise();
        return 200;
      } catch (err) {
        return new Error(`Internal server error: ${JSON.stringify(err)}`);
      }
    } catch (e) {
      return new Error('File doesn\'t exists');
    }
  }
}

export default deleteFileFunction;
