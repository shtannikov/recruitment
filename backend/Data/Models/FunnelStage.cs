namespace recruitment.Data;

public class FunnelStage
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; }
    public int FunnelId { get; set; }
    
    public virtual Funnel Funnel { get; set; }
    public virtual ICollection<Candidate> Candidates { get; set; }
}