namespace recruitment.Data;

public class Funnel
{
    public int Id { get; set; }
    public Vacancy Vacancy { get; set; }
    public ICollection<FunnelStage> Stages { get; set; }
}