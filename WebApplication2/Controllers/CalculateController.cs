using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebApplication2.Commands;
using WebApplication2.DTO;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculateController : ControllerBase
    {
        private static readonly List<UnitOfMeasure> measures = new List<UnitOfMeasure> {
            new UnitOfMeasure { Measure = "PCS", Rate = 1 },
            new UnitOfMeasure { Measure = "LUSIN", Rate = 12 },
            new UnitOfMeasure { Measure = "BOX", Rate = 24 }
        };

        public CalculateController()
        {

        }

        [HttpGet, Route("Units")]
        public List<UnitOfMeasure> Units()
        {
            return measures;
        }

        [HttpPost]
        public IActionResult Create([FromBody]CalculateCommand command)
        {
            var data = new CalculateDto();
            var unit = measures.FirstOrDefault(x => x.Measure == command.Unit);
            if (unit != null)
            {
                data.Quantity = command.Quantity * unit.Rate;
                long totalPrice = data.Quantity * command.Price;
                long discount = 0;
                if (long.TryParse(command.Discount, out discount))
                    data.Discount = discount;
                else if (command.Discount.Contains("%"))
                {
                    if (command.Discount.Contains("+"))
                    {
                        List<string> discounts = command.Discount.Split("+").ToList();
                        foreach (var item in discounts)
                        {
                            if (long.TryParse(item.Replace("%", ""), out discount))
                            {
                                data.Discount += (long)(((double)discount / 100) * totalPrice);
                            }
                        }
                    }
                    else
                    {
                        if (long.TryParse(command.Discount.Replace("%", ""), out discount))
                            data.Discount = (long)(((double)discount / 100) * totalPrice);
                    }
                }
                else
                {
                    List<string> discounts = command.Discount.Split("+").ToList();
                    foreach (var item in discounts)
                    {
                        if (long.TryParse(item.Replace("%", ""), out discount))
                        {
                            data.Discount += ((discount / 100) * totalPrice);
                        }
                    }
                }

                data.Total = totalPrice - data.Discount;
            }
            return Ok(data);
        }
    }
}
