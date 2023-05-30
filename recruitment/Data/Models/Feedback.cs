namespace recruitment.Data;

public class Feedback
{
    public int Id { get; set; }

    public string Text { get; set; }
    public DateTime CreationDateTimeUtc { get; set; }
    
    public int CandidateId { get; set; }
    public virtual Candidate Candidate { get; set; }

    public int FunnelStageId { get; set; }
    public virtual FunnelStage FunnelStage { get; set; }

    public string AuthorId { get; set; }
    public virtual ApplicationUser Author { get; set; }
}