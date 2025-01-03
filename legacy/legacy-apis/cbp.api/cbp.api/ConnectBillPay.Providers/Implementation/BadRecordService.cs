using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Implementation
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

        public async Task<ServiceResponse<BadRecordListResponse>> GetBadRecordsFromDate(DateTime fromDate)
        {
            var records = (await _badRecordRepository.FindAsync(x => x.Created.Date == fromDate.Date))
                .Select(x => _mapper.Map<BadRecordResponse>(x))
                .ToList();

            var response = new BadRecordListResponse
            {
                BadRecords = records
            };

            return new ServiceResponse<BadRecordListResponse>
            {
                StatusCode = StatusCodes.Status200OK,
                Object = response
            };
        }
    }
}