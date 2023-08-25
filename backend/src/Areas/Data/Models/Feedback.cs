namespace recruitment.Data;

public class Feedback
{
    public int Id { get; set; }

    public string Text { get; set; }
    public DateTime CreationDateTimeUtc { get; set; }

    public int CandidateId { get; set; }
    public Candidate Candidate { get; set; }

    public int FunnelStageId { get; set; }
    public FunnelStage FunnelStage { get; set; }

    public string AuthorId { get; set; }
    public ApplicationUser Author { get; set; }
}