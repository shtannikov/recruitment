namespace recruitment.GraphQL;

public class Candidate
{
    public int Id { get; set; }

    public string FirstName { get; set; }
    public string? MiddleName { get; set; } = "";
    public string LastName { get; set; }

    public string? City { get; set; }

    public Contact[]? Contacts { get; set; }

    public int ElapsedDaysInCurrentStage { get; set; }
}

public class CandidateVacancy
{
    public string CurrentFunnelStageName { get; set; }
    public string VacancyName { get; set; }
    public string[] NextFunnelStagesNames { get; set; }

    public bool IsArchive { get; set; }
}

public class Contact
{
    public int Id { get; set; }
    public string Value { get; set; }

    public string Type { get; set; }

    public int CandidateId { get; set; }
}

public class FunnelStage
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; }
    public Candidate[] Candidates { get; set; }
}

public class Funnel
{
    public int Id { get; set; }
    public Vacancy Vacancy { get; set; }
    public FunnelStage[] OrderedStages { get; set; }

    public bool IsArchive { get; set; }
}

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RecruitemtFunnelId { get; set; }
    public Funnel RecruitemtFunnel { get; set; }

    public bool IsArchive { get; set; }
}