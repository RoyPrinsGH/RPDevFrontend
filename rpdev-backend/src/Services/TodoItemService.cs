namespace RPDev.Services;

using System.Collections.Generic;
using Data;
using Data.Models;

public class TodoItemService(RPDevDataContext dataContext)
{
    private readonly RPDevDataContext _dataContext = dataContext;

    public IEnumerable<TodoItem> GetAllTodoItems()
    {
        return _dataContext.TodoItems;
    }
}