using BuildrOps.Application.Contracts.Infrastructure;
using BuildrOps.Application.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Infrastructure.Calendarific
{
    public class CalendarificAPIService : ICalendarific
    {
        public async Task<List<CalenderificHoliday>> GetAllCalendarificHolidays(string country, string region, string year)
        {
            try
            {
                string path = string.Format("holidays?api_key=61c6d83657360ed6eeca5f02b051e03d83be2cba&country={0}&year={1}&location={2}&&type=local,National", country, year, region);
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("https://calendarific.com/api/v2/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.GetAsync(path);
                if (response.IsSuccessStatusCode)
                {
                    string data = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(data))
                    {
                        CalendarificAPIResponse calendarificAPIResponse = JsonConvert.DeserializeObject<CalendarificAPIResponse>(data);
                        return calendarificAPIResponse.response.holidays;
                    }
                }
            }
            catch(Exception ex)
            {

            }
            return null;
        }
    }
}
