namespace RPDev.Services.TodoItems;

using System.Collections.Generic;
using Services.Generic;
using Models.DatabaseObjects;
using Models.Representations;
using Microsoft.EntityFrameworkCore;
using RPDev.Generic;

public interface ITodoItemService
{
    Task<List<TodoItemReadOnly>> GetAllTodoItems();
    Task<(bool success, TodoItemReadOnly? item)> GetTodoItemById(int id);
    Task<(bool success, string[] softErrors, TodoItemReadOnly? item)> CreateTodoItem(Commands.TodoItemCreateCommand todoItemCreateCommand);
    Task<(bool success, string[] softErrors)> UpdateTodoItem(Commands.TodoItemUpdateCommand todoItemUpdateCommand);
}

public class TodoItemService(RPDevDataContext dataContext) : ITodoItemService
{
    private readonly RPDevDataContext _dataContext = dataContext;

    public async Task<List<TodoItemReadOnly>> GetAllTodoItems()
    {
        return await _dataContext.TodoItems.Select(todoItem => new TodoItemReadOnly(todoItem.Id, todoItem.Name, todoItem.IsComplete)).ToListAsync();
    }

    public async Task<(bool success, TodoItemReadOnly? item)> GetTodoItemById(int id)
    {
        TodoItem? todoItem = await _dataContext.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return (false, null);
        }
        return (true, new TodoItemReadOnly(todoItem.Id, todoItem.Name, todoItem.IsComplete));
    }

    public async Task<(bool success, string[] softErrors, TodoItemReadOnly? item)> CreateTodoItem(Commands.TodoItemCreateCommand todoItemCreateCommand)
    {
        {
            IEnumerable<string> validationErrors = todoItemCreateCommand.Name.BeginValidation<string, string>()
                                                                             .IsNotNull("Name must not be null.")
                                                                             .ValidationPass((string? name) => name is null || name.Length > 0, "Name must not be empty.")
                                                                             .Collect();

            if (validationErrors.Any()) {
                return (false, validationErrors.ToArray(), null);
            }
        }

        string name = todoItemCreateCommand.Name;
        bool isComplete = todoItemCreateCommand.IsComplete.NoValidation();

        TodoItem todoItem = new() {
            Name = name,
            IsComplete = isComplete
        };

        _dataContext.TodoItems.Add(todoItem);
        await _dataContext.SaveChangesAsync();

        return (true, [], new TodoItemReadOnly(todoItem.Id, todoItem.Name, todoItem.IsComplete));
    }

    public async Task<(bool success, string[] softErrors)> UpdateTodoItem(Commands.TodoItemUpdateCommand todoItemUpdateCommand)
    {
        int id = todoItemUpdateCommand.Id.NoValidation();

        {
            IEnumerable<string> validationErrors = todoItemUpdateCommand.Name.BeginValidation<string, string>()
                                                                             .ValidationPass((string? name) => name is null || name.Length > 0, "Name must not be empty.")
                                                                             .Collect();

            if (validationErrors.Any()) {
                return (false, validationErrors.ToArray());
            }
        }

        TodoItem? todoItem = await _dataContext.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return (false, ["Item not found"]);
        }

        if (todoItemUpdateCommand.Name != null)
        {
            todoItem.Name = todoItemUpdateCommand.Name;
        }

        if (todoItemUpdateCommand.IsComplete != null)
        {
            todoItem.IsComplete = todoItemUpdateCommand.IsComplete.Value;
        }

        await _dataContext.SaveChangesAsync();

        return (true, []);
    }
}