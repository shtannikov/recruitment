namespace recruitment.Data;

public class Candidate
{
    public int Id { get; set; }
    
    public string MobilePhone { get; set; }
    public string Email { get; set; }

    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string City { get; set; }

    public int ElapsedDaysInCurrentStage { get; set; }
    public int CurrentStageId { get; set; }
    public FunnelStage CurrentStage { get; set; }
}