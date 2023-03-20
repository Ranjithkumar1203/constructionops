using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using BuildrOps.Application.AWSCredentials;
using BuildrOps.Application.Contracts.Infrastructure;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Infrastructure.AWS
{
    public class AmazonS3Service : IAmazonS3Services
    {
        private IAmazonS3 _AmazonService;
        private AmazonS3Credentials _AmazonS3Credentials;

        public AmazonS3Service(IAmazonS3 service, IOptions<AmazonS3Credentials> AmazonCredentials)
        {
            _AmazonS3Credentials = AmazonCredentials.Value;
            
            _AmazonService = service;
        }

        public async Task UploadFileToS3(string BucketName, string FileName, Stream fileStream)
        {
            try
            {
                _AmazonService = new AmazonS3Client(_AmazonS3Credentials.AccessKey, _AmazonS3Credentials.SecretKey, RegionEndpoint.USEast2);
                TransferUtility TransferFile = new TransferUtility(_AmazonService);
                await TransferFile.UploadAsync(fileStream, BucketName, FileName);
            }
            catch(Exception ex)
            { 
            }
            //var request = new PutObjectRequest
            //{
            //    BucketName = "bucketName",
            //    CannedACL = S3CannedACL.PublicRead,
            //    Key = string.Format("bucketName/{0}", "foo.jpg"),
            //    InputStream=fileStream
            //};
            //_AmazonService.PutObject(request);
        }



       
        public string GeneratePreSignedURL(int duration, string bucketName, string objectKey)
        {
            string urlString = "";
            try
            {
                _AmazonService = new AmazonS3Client(_AmazonS3Credentials.AccessKey, _AmazonS3Credentials.SecretKey, Amazon.RegionEndpoint.USWest2);
                GetPreSignedUrlRequest request1 = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = objectKey,
                    Expires = DateTime.UtcNow.AddMinutes(duration)
                };
                urlString = _AmazonService.GetPreSignedURL(request1);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            return urlString;
        }

    }
}
