﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyQualityAssurance.Commands.GetCompanyQuality
{
  public  class GetCompanyQualityResponse
    {
        public int Id { get; set; }
        public string CompanyQuality { get; set; }
    }
}
