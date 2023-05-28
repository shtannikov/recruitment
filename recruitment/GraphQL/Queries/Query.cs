using Microsoft.EntityFrameworkCore;
using recruitment.Data;

namespace recruitment.GraphQL;

public class Query
{
    public IQueryable<Vacancy> GetActiveVacancies([Service] AppDbContext dbContext)
        => dbContext.Vacancies
            .Include(v => v.RecruitemtFunnel);

    public UserSettingsQuery UserSettings => new UserSettingsQuery();

    public Funnel? GetRecruitmentFunnel(int id, [Service] AppDbContext dbContext) =>
        dbContext.Funnel
            .Include(f => f.Vacancy)
            .Include(f => f.Stages)
            .ThenInclude(s => s.Candidates)
            .SingleOrDefault(f => f.Id == id);

    public Candidate? GetCandidate(int id, [Service] AppDbContext dbContext) =>
        dbContext.Candidates
            .Include(c => c.CurrentStage)
            .ThenInclude(s => s.Funnel)
            .ThenInclude(f => f.Vacancy)
            .SingleOrDefault(c => c.Id == id);
}