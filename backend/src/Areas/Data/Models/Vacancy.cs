namespace recruitment.Data;

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RecruitmentFunnelId { get; set; }
    public virtual Funnel RecruitmentFunnel { get; set; }
}