using recruitment.Data;

namespace recruitment.data
{
    public class CandidateRepository
    {
        private readonly AppDbContext _context;

        public CandidateRepository(AppDbContext context)
        {
            if (context == null) throw new ArgumentNullException("context");
            _context = context;
        }

        public Candidate Get()
        {
            return _context.Set<Candidate>().First();
        }
    }
}
