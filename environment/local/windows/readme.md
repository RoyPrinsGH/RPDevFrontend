# Local development on Windows
Clone the repo and make sure you have Node and .NET 8 installed.

## Running the front end only (enabling Vite hot reload)
Running `environment/local/windows/scripts/frontend.cmd` will start the Vite server. Making any change to a development file will cause Vite's websocket to refresh the corresponding local page in the browser.

## Running the full app
Simply run `environment/local/windows/scripts/full-app.cmd`. This will build the project in the `environment/local/windows/devenv` folder and start Kestrel locally, which runs the API and serves the front end.

A couple things still have to be worked out:
- Running in-process in IIS is not supported as of yet.
- How the database setup/maintenance is going to work. This decision will have to be made once the database creation mission is started.

## Can't I just `npm run dev`/`dotnet run`?
As a maintenance measure, I rely on scripts. This way I can update the inner workings of the environment setup without ever changing the developer's workflow side of things. Kind of like Dependency Injection!

## Notes
- Do not modify any files in the `environment/local/windows/devenv` folder. This folder is cleared on every rebuild.