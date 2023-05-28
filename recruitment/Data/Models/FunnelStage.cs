namespace recruitment.Data;

public class FunnelStage
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; }
    
    public Funnel Funnel { get; set; }
    public ICollection<Candidate> Candidates { get; set; }
}