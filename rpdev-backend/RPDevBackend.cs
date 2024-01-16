var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// We have no homepage yet. Redirect to about page.
app.MapGet("/", () => Results.Redirect("/about"));

app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();