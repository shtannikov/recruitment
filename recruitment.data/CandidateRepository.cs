namespace recruitment.data
{
    public class CandidateRepository
    {
        private readonly DataContext _context;

        public CandidateRepository(DataContext context)
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
