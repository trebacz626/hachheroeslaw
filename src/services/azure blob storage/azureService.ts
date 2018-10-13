import config from "../../configuration/main";
import * as storage from 'azure-storage'

/*
  Service used to connect to azure blob storage. 
  Blob and container must be public.
 */
class AzureUploader {
  blobService: storage.BlobService;
  containerName: string;

  constructor() {
    this.blobService = storage.createBlobService(config.azurBlobStorage.connectionString);
    this.containerName = config.azurBlobStorage.containerName;
  }
  //creates container if not exists might be usefull in future
  createContainer()  {
    return new Promise((resolve, reject) => {
      this.blobService.createContainerIfNotExists(this.containerName, { publicAccessLevel: 'blob' }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };
  //promise wrapper for blobService.createBlockBlobFromLocalFile
  private uploadBlob (sourceFilePath: string, blobName: string) {
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromLocalFile(this.containerName, blobName, sourceFilePath, err => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: `Upload of '${blobName}' complete` });
        }
      });
    });
  };

  async upload(sourceFilePath: string, blobName: string) :Promise<string>{
    await this.uploadBlob(sourceFilePath, blobName);
    let url = this.blobService.getUrl(this.containerName, blobName);
    return url;
  }
}

export default new AzureUploader();