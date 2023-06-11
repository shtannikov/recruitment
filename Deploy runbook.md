# Deploy runbook

### Building the new app version
1. Open terminal in `/backend` folder
2. Run command `dotnet publish --configuration Release`

### Release publication
1. Switch terminal to release folder `cd src/bin/Release/net7.0`
2. Upload release to VM `scp -r publish shtannikov@158.160.63.240:apps`

### Shutting down an old app version
1. Connect to the VM `ssh shtannikov@158.160.63.240`
2. Run command `sudo lsof -i :5000`
3. Take PID from the result and paste it into the command `sudo kill {PID}`

### <s>Launching the new app version</s> 
<b>Not relevant anymore. Now it's done by a daemon that monitors the app status</b>
1. Connect to the VM `ssh shtannikov@158.160.63.240`
2. Switch terminal to release folder `cd apps/publish`
3. Run command `dotnet recruitment.dll` 