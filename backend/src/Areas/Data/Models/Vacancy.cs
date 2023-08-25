namespace recruitment.Data;

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RecruitmentFunnelId { get; set; }
    public Funnel RecruitmentFunnel { get; set; }
}