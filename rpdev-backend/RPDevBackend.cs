using RPDev;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<RPDevExceptionHandler>();

var app = builder.Build();

app.UseStatusCodePages();

if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
} else {
    app.UseExceptionHandler();
}

app.UseStaticFiles();
app.UseRouting();

app.MapFallbackToFile("index.html");

// We have no homepage yet. Redirect to about page.
app.MapGet("/", () => Results.Redirect("/about"));

// Exception and error testing
app.MapGet("/generate/exception", () => { 
    throw new Exception("This is an exception!");
});

app.MapGet("/generate/code404", () => Results.NotFound());
app.MapGet("/generate/code400", () => Results.BadRequest());

app.Run();