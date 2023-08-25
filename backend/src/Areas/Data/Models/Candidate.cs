namespace recruitment.Data;

public class Candidate
{
    public int Id { get; set; }

    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public DateTime StageEntranceDateTimeUtc { get; set; }
    public int CurrentStageId { get; set; }
    public FunnelStage CurrentStage { get; set; }

    public ICollection<Feedback> Feedbacks { get; set; }
}