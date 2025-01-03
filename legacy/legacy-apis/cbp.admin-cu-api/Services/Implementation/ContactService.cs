using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Requests.Contact;
using Responses.Contact;
using Services.Abstract;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class ContactService : IContactService
    {
        private readonly ICuGenericRepository<Contact> _contactRepository;
        private readonly IMapper _mapper;

        public ContactService(ICuGenericRepository<Contact> contactRepository, IMapper mapper)
        {
            _contactRepository = contactRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> Create(ContactCreateRequest request)
        {
            var found = await _contactRepository.GetAsync(x => x.FirstName == request.FirstName && x.LastName == request.LastName && x.Email == request.Email && x.Deleted == false);
            if (found != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var contact = _mapper.Map<Contact>(request);
            _contactRepository.Add(contact);
            await _contactRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> Delete(Guid id)
        {
            var contact = await _contactRepository.GetAsync(x => x.Id == id);
            if (contact == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            contact.Deleted = true;

            _contactRepository.Update(contact);
            await _contactRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<ContactListResponse>> GetAll()
        {
            var contacts = (await _contactRepository.FindAsync(x => x.Deleted == false))
                .Select(_mapper.Map<ContactResponse>)
                .ToList();

            return new ServiceResponse<ContactListResponse>
            {
                StatusCode = 200,
                Object = new ContactListResponse
                {
                    Contacts = contacts
                }
            };
        }

        public async Task<ServiceResponse> Update(ContactUpdateRequest request)
        {
            var contact = await _contactRepository.GetAsync(request.Id);
            if (contact == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var found = await _contactRepository.GetAsync(x => x.FirstName == request.FirstName && x.LastName == request.LastName && x.Email == request.Email && x.Deleted == false && x.Id != contact.Id);
            if (found != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            _mapper.Map(request, contact);
            _contactRepository.Update(contact);
            await _contactRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
