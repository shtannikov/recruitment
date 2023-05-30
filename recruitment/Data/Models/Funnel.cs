namespace recruitment.Data;

public class Funnel
{
    public int Id { get; set; }
    public virtual Vacancy Vacancy { get; set; }
    public virtual ICollection<FunnelStage> Stages { get; set; }
}