namespace recruitment.GraphQL;

public class Query
{
    public Vacancy[] GetVacancies() => new[]
    {
        FrontendVacancy.Value,
        BackendVacancy.Value
    };

    public Funnel? GetRecruitmentFunnel(int id) =>
        GetVacancies()
            .Select(v => v.RecruitemtFunnel)
            .SingleOrDefault(f => f.Id == id);
    
    public Candidate? GetCandidate(int id) =>
        GetVacancies()
            .SelectMany(v => v.RecruitemtFunnel.OrderedStages)
            .SelectMany(s => s.Candidates)
            .SingleOrDefault(c => c.Id == id);
}