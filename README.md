# Todo Example with Apico Google Sheets 
This example showcases how you can build a simple Todo application with Google sheets as a backend.


https://github.com/apicodev/example-react-todo-google-sheets/assets/53584487/5c20be45-fd29-41c2-9548-600ef28c18c0



## Running the project

---
### Setup the repository
Clone the repository into your machine
```
$ git clone https://github.com/apicodev/example-react-todo-google-sheets.git
```


CD into the reposity and install the dependencies

```
$ cd example-react-todo-google-sheets
$ npm install
```

---
### Create a Google Sheet Integration in Apico
Login to your [Apico](https://apico.dev) account and create a new Google sheets integration. Note the integration ID in the Readme.md file.

![image](https://github.com/apicodev/example-react-todo-google-sheets/assets/53584487/79379d9e-3b6e-4b80-b45d-65be830e3cee)

---
### Create an Empty Google sheet in your Google Account
Login to your [Google Sheets](https://sheets.google.com) account and create a new Google Sheet and note down the URL

The URL should look something similar to this
```
https://docs.google.com/spreadsheets/d/1AzT-z51EMqI_-Fe98434p_AP8Nq343rbheLPUfnw1FGCNo/edit#gid=1196872439
```

Here the variables you might need are as follows

| Variable     | Value                                               |
|--------------|-----------------------------------------------------|
| spreadSheetId| 1AzT-z51EMqI_-Fe98434p_AP8Nq343rbheLPUfnw1FGCNo     |
| sheetId      | 1196872439                                          |

The name of your sheet/page or `SheetName` will be displayed at the bottom of the google sheets page. Optionally you can find the name and sheetId (gid) via the *Get Spreadsheet API*.

---
### Replace the variables in the code
Open the `/src/api/sheets.ts` file and replace the variables in the following lines
```
...
const apicoIntegrationId: string = "<Replace with your apico gsheet integration id>";
const spreadSheetId: string = "<Replace with your google sheet id>";
const sheetName: string = "Sheet1"; // replace with your sheet name
const sheetId: number = 1196872439; // replace with your sheet/page gid (not sheet name)
...
```

---
### Finally run the project!
```
npm run dev
```

![Screenshot 2024-02-11 at 12 05 30 AM](https://github.com/apicodev/example-react-todo-google-sheets/assets/53584487/1e0d9e05-56ca-4a02-9dc5-915f3c801d7d)
