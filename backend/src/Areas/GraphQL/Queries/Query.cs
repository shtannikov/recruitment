using recruitment.Data;

namespace recruitment.GraphQL;

public class Query
{
    public UserSettingsQuery UserSettings => new();

    [UseProjection]
    public IQueryable<Vacancy> GetActiveVacancies([Service] AppDbContext dbContext)
        => dbContext.Vacancies;

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Funnel> GetRecruitmentFunnel(int id, [Service] AppDbContext dbContext)
        => dbContext.Funnels;

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Candidate> GetCandidate(int id, [Service] AppDbContext dbContext)
        => dbContext.Candidates;
}