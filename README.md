## Demo

![demo](https://github.com/shtannikov/recruitment/assets/31800676/72b6db7a-8140-4e1c-b8a7-86b6ff1a7adf)


## Hackathon task description

Automate the entire cycle of candidate selection for a job vacancy: from the moment of application to the onboarding of a new employee.

The system should include the following components:

❌ Integrations with various sourcing channels such as job boards, social media, referrals, and career sites.

✅ Monitoring all stages of a recruitment funnel. Depending on the vacancy, the recruitment funnel may include different stages

❌ Effective communication with hiring managers and candidates: integrations with calendars, email services, and messengers

✅ Role model: HRBP, recruiters, hiring managers, and others

✅ Maintaining a unified database of candidates and job vacancies

❌ Collecting statistics and generating reports

## Solution description

https://www.notion.so/shtannikov/e74c4d3170824326b2f4f0f54bcf7da5

## Running the system locally

### Requirements

- .NET SDK 7.0+ (https://dotnet.microsoft.com/en-us/download)
- Node.JS 18.16+ (https://nodejs.org/en)

### Manual

For launching the system, simply run the backend app. It will automatically build and pull the frontend app. This is achieved through a rewritten build process, implemented in `/backend/src/recruitment.csproj`.

1. Open terminal in `/backend` folder
2. Run command `dotnet run --configuration Debug`

## System access

### Production

~~Link to the production version: http://158.160.63.240~~ 

UPD: production turned off

### Prepared accounts

Depending on the role, the platform opens up different opportunities. In order to verify this, the system has prepared accounts with different roles.

Here they are:

- hiring manager: hiring-manager@test.com
- recruiter: recruiter@test.com
- lead recruiter: lead-recruiter@test.com

For easy switching between accounts, all accounts have the same password.

<b>Password: JzHwPA5_!vTwYVW</b>

### Adding a new account

A manual is available [in Notion](https://shtannikov.notion.site/ee324577c73743f08ba09695f5526589)
