var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// We have no homepage yet. Redirect to about page.
app.MapGet("/", () => Results.Redirect("/about"));

if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Development environment detected");
    app.UseDeveloperExceptionPage();
} else if (app.Environment.IsProduction()) {
    Console.WriteLine("Production environment detected");
} else if (app.Environment.IsStaging()) {
    Console.WriteLine("Staging environment detected");
} else {
    Console.WriteLine("Unknown environment detected");
}

app.UseDeveloperExceptionPage();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();