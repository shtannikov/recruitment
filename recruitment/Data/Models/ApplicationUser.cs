using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace recruitment.Data;

[Table("AspNetUsers")]
public class ApplicationUser : IdentityUser
{
    public string PersonalName { get; set; }
}