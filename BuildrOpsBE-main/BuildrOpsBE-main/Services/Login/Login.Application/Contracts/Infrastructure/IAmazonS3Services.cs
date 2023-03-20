using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Infrastructure
{
    public interface IAmazonS3Services
    {
        public Task UploadFileToS3(string BucketName, string FileName, Stream fileStream);
        public string GeneratePreSignedURL(int duration, string bucketName, string objectKey);
    }
}
