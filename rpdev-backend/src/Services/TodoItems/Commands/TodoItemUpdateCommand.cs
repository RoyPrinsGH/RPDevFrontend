namespace RPDev.Services.TodoItems.Commands;

/// <summary>
/// Represents the command to update a TodoItem in the database.
/// When a property is null, it will not be updated.
/// </summary>
public class TodoItemUpdateCommand {
    public required int Id { get; init; }
    public string? Name { get; init; }
    public bool? IsComplete { get; init; }
}