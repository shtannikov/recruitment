using recruitment.data;

namespace recruitment.GraphQL;

public class Query
{
    public Vacancy[] GetVacancies([Service] CandidateRepository repository) => new[]
    {
        FrontendVacancy.GetValue(),
        BackendVacancy.GetVacancy(repository)
    };

    public UserSettingsQuery UserSettings => new UserSettingsQuery();

    public Funnel? GetRecruitmentFunnel(int id, [Service] CandidateRepository repository) =>
        GetVacancies(repository)
            .Select(v => v.RecruitemtFunnel)
            .SingleOrDefault(f => f.Id == id);
    
    public Candidate? GetCandidate(int id, [Service] CandidateRepository repository) =>
        GetVacancies(repository)
            .SelectMany(v => v.RecruitemtFunnel.OrderedStages)
            .SelectMany(s => s.Candidates)
            .SingleOrDefault(c => c.Id == id);
}