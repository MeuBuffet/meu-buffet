using System.ComponentModel.DataAnnotations;
using SrShut.Cqrs.Commands;

namespace FesteroApp.Application.UseCases.Organizations.UpdateOrganizationConfiguration;

public class UpdateOrganizationConfigurationCommand : ICommand
{
    [Required] public Guid Id { get; set; }

    public TimeSpan? WorkdayStart { get; set; }

    public TimeSpan? WorkdayEnd { get; set; }
}