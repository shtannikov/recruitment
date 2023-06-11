## Demo

![demo](https://github.com/shtannikov/recruitment/assets/31800676/72b6db7a-8140-4e1c-b8a7-86b6ff1a7adf)


## Описание задачи

Автоматизировать полный цикл подбора кандидата на вакансию с момента заявки до выхода нового сотрудника.

Необходимо решить следующие задачи:

❌ Поиск и подбор необходимых кандидатов на вакансию (Возможность интеграции с HH.ru и другими сервисами)

✅ Контроль всех этапов подбора сотрудника (пример этапов: создание заявки на подбор, поиск и отбор кандидатов, назначение этапов  собеседований, отправка отказов и офферов кандидатам)

❌ Возможность эффективной коммуникации с заказчиками и кандидатами (Назначение интервью, интеграции с календарем, почтовыми сервисами и мессенджерами)

✅ Ролевая модель (HRBP, заказчики, рекрутеры, кандидаты и прочие)

✅ Ведение единой базы кандидатов и вакансий (Карточка кандидата, заявка на подбор)

❌ Сбор статистики и формирование отчетности

## Solution description

https://www.notion.so/shtannikov/e74c4d3170824326b2f4f0f54bcf7da5

## Локальный запуск системы

### Зависимости

Для локального запуска системы на компьютере должен быть установлен .NET SDK 7.0+ и Node.JS 18.16+
Ссылки на установщики:
- .NET SDK: https://dotnet.microsoft.com/en-us/download
- Node.JS: https://nodejs.org/en

### Инструкция

Для запуска всех компонентов системы достаточно запустить бэкэнд-приложение. Оно само соберёт и подтянет фронтенд-приложение. Это сделано через переписанный процесс сборки, реализация лежит в `/backend/src/recruitment.csproj`

1. Открыть консоль в папке с recruitment.csproj
2. Выполнить команду `dotnet run --configuration Debug`

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

Instructions and a live demo are available via the link in Notion: https://shtannikov.notion.site/ee324577c73743f08ba09695f5526589
