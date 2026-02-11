# E-Commerce pet project

## About project:

* You'll need to setup stripe locally for running this project with payment functionality.
* <https://docs.stripe.com/stripe-cli/install>
* For windows i highly recommend to use scoop installer, for Mac OS - brew, and for linux users - apt.

## How to run it locally:

1. Open API folder
2. Create appsettings.Development.json file in API folder and fill it with next data:
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": ""
  },
  "StripeSettings": {
    "PublishableKey": "pk_test_########################",
    "SecretKey": "sk_test_########################",
    "WhSecret": "whsec_########################"
  }
}
```

* Values of __*"PublishableKey"*__ and __*"SecretKey"*__ you can find in your stripe account.
* Value of __*"WhSecret"*__ you'll get on step #5.
* Value of __*DefaultConnection*__ is:
* If you would like to run application locally with just default test collection:
>Data source=store.db

* And if you want to run it with sql server, which running on docker, use:
> Server=localhost,1433;Database=shop;User Id=sa;Password=Password@1;TrustServerCertificate=True


3. To install require dotnet libs, use command: 
>dotnet restore

4. Run command to start project API locally (used port by default localhost:5001)
>dotnet watch
 
5. Then run command to start stripe listening to local webhooks
>stripe listen -f https://localhost:5001/api/payments/webhook  -e payment_intent.succeeded,payment_intent.payment_failed

6. Open client folder
7. To install require node libraries, run next command:
>npm i --legacy-peer-deps

8. Then run command to start client project locally (used port by default is localhost:3000)
>npm run dev


### Some default users credentials:

1. User:
> Email = "Denis@test.com"
> Password = "Pa$$w0rd"

2. Admin:
> Email = "admin@test.com"
> Password = "Pa$$w0rd"