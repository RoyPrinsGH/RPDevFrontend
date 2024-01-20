namespace RPDev.Services.TodoItems.Commands;

/// <summary>
/// Represents the command to create a TodoItem in the database.
/// </summary>
public class TodoItemCreateCommand {
    public required string Name { get; init; }
    public required bool IsComplete { get; init; }
}