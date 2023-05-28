using recruitment.data;

namespace recruitment.GraphQL;

public class Query
{
    public Vacancy[] GetActiveVacancies([Service] CandidateRepository repository) => new[]
    {
        FrontendVacancy.GetValue(),
        BackendVacancy.GetVacancy(repository),
    };

    public Vacancy[] GetAllVacancies([Service] CandidateRepository repository) => new[]
    {
        FrontendVacancy.GetValue(),
        BackendVacancy.GetVacancy(repository),
        ArchiveVacancy.GetVacancy(repository)
    };

    public UserSettingsQuery UserSettings => new UserSettingsQuery();

    public Funnel? GetRecruitmentFunnel(int id, [Service] CandidateRepository repository) =>
        GetActiveVacancies(repository)
            .Select(v => v.RecruitemtFunnel)
            .SingleOrDefault(f => f.Id == id);

    public Candidate? GetCandidate(int id, [Service] CandidateRepository repository) =>
        GetActiveVacancies(repository)
            .SelectMany(v => v.RecruitemtFunnel.OrderedStages)
            .SelectMany(s => s.Candidates)
            .SingleOrDefault(c => c.Id == id);

    public CandidateVacancy[] GetCandidateVacancies(int id, [Service] CandidateRepository repository)
    {
        return GetAllVacancies(repository).Where(v => v.RecruitemtFunnel.OrderedStages.Any(c => c.Candidates.Select(c => c.Id).Contains(id)))
        .Select(v =>
        {
            var currentStage = v.RecruitemtFunnel.OrderedStages.SingleOrDefault(c => c.Candidates.Any(c => c.Id == id));
            return
                new CandidateVacancy()
                {
                    CurrentFunnelStageName = currentStage?.Name,
                    IsArchive = v.IsArchive,
                    NextFunnelStagesNames = v.RecruitemtFunnel.OrderedStages.Where(t => t.Order > currentStage.Order).Select(c => c.Name).ToArray(),
                    VacancyName = v.Name,
                };
        }).ToArray();
    }
}