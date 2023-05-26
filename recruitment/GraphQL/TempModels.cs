namespace recruitment.GraphQL;

public class Candidate
{
    public int Id { get; set; }

    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public int ElapsedDaysInCurrentStage { get; set; }
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
    public FunnelStage[] OrderedStages { get; set; }
}

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RecruitemtFunnelId { get; set; }
    public Funnel RecruitemtFunnel { get; set; }
}