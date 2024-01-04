import { Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { Environment } from '@shared/variables/environment';

export enum FileTypes {
  userAvatarCovet = 'userAvatarCovet',
  groupAvatarCovet = 'groupAvatarCovet',
}

@Injectable()
export class FileService {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: 'eu-central-1',
      accessKeyId: Environment.S3_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: Environment.S3_BUCKET_SECRET_ACCESS_KEY,
    });
  }

  async createFile(type: FileTypes, file): Promise<string> {
    const id = uuidv4();
    const buffer = Buffer.from(file.buffer);
    const uploadParams = {
      Bucket: 'course-platform',
      Body: buffer,
      Key: `${type}/${id}`,
      ACL: 'public-read',
    };
    try {
      const uploadedObject = await this.s3.upload(uploadParams).promise();
      return uploadedObject.Location;
    } catch (error) {
      throw error;
    }
  }
}
