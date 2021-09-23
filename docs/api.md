# API
Here, we will discuss how to run and debug the API locally, as well as how to deploy it to Firebase.

## Cloud Function Setup
Execute the following commands to run the API locally:

```bash
git clone https://github.com/jabaridash/home-automation.git
cd home-automation/functions
npm install
firebase login
npm start
```

This assumes you have the Firebase CLI installed locally.

To get the environment from production:

```
firebase functions:config:get
```

This can also be stored into a file. If Firebase detects a `runtimeconfig.json` locally, it will be used
as the config. Here you can override configuration. If the file is not present, the production file will
be used.

```
firebase functions:config:get > .runtimeconfig.json
```