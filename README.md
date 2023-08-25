## System description

This system is designed for the management of a unified database of job vacancies and candidate profiles.

Implemented features:
- Flexible recruitment funnel: depending on the vacancy, the recruitment funnel can include different stages
- Role-centric UI: depending on the role, the system provides different opportunities

Implementation details is described in [this notion articles](https://shtannikov.notion.site/e74c4d3170824326b2f4f0f54bcf7da5)

### Demo

https://github.com/shtannikov/recruitment/assets/31800676/f2256166-b886-42f5-bc02-dffb67192084

## Running the system locally

### Requirements

- .NET SDK 7.0+ (https://dotnet.microsoft.com/en-us/download)
- Node.JS 18.16+ (https://nodejs.org/en)

### Manual

For launching the system, simply run the backend app. It will automatically build and pull the frontend app. This is achieved through a rewritten build process, implemented in `/backend/src/recruitment.csproj`.

1. Open terminal in `/backend/src` folder
2. Run command `dotnet run --configuration Debug`

### System access

### Prepared accounts

Depending on the role, the system provides different opportunities. In order to verify this, the system has prepared accounts with different roles.

Here they are:

- hiring manager: hiring-manager@test.com
- recruiter: recruiter@test.com
- lead recruiter: lead-recruiter@test.com

For easy switching between accounts, all accounts have the same password.

<b>Password: JzHwPA5_!vTwYVW</b>

### Adding a new account

A manual is available [in Notion](https://shtannikov.notion.site/ee324577c73743f08ba09695f5526589)
