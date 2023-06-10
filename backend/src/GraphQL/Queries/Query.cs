using recruitment.Data;

namespace recruitment.GraphQL;

public class Query
{
    public IQueryable<Vacancy> GetActiveVacancies([Service] AppDbContext dbContext)
        => dbContext.Vacancies;

    public UserSettingsQuery UserSettings => new UserSettingsQuery();

    public Funnel? GetRecruitmentFunnel(int id, [Service] AppDbContext dbContext) =>
        dbContext.Funnels
            .SingleOrDefault(f => f.Id == id);

    public Candidate? GetCandidate(int id, [Service] AppDbContext dbContext) =>
        dbContext.Candidates
            .SingleOrDefault(c => c.Id == id);
}