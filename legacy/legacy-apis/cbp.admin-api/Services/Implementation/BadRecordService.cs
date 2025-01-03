using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Responses;
using Services.Abstract;


namespace Services.Implementation
{
    public class BadRecordService : IBadRecordService
    {
        private readonly IMapper _mapper;
        private readonly IWarehouseGenericRepository<BadRecord> _badRecordRepository;

        public BadRecordService(IMapper mapper,
            IWarehouseGenericRepository<BadRecord> badRecordRepository)
        {
            _mapper = mapper;
            _badRecordRepository = badRecordRepository;
        }

        public async Task<ServiceResponse<BadRecordListResponse>> GetBadRecordsAsync(DateTime date)
        {
            var records = (await _badRecordRepository.FindAsync(x => x.Created.Date == date.Date))
                .Select(x => _mapper.Map<BadRecordResponse>(x))
                .ToList();

            var response = new BadRecordListResponse
            {
                BadRecords = records
            };

            return new ServiceResponse<BadRecordListResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }
    }
}
