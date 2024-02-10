# Todo Example with Apico Google Sheets 
This example showcases how you can build a simple Todo application with Google sheets as a backend.

## Running the project
1. Clone the repository into your machine
```
$ git clone https://github.com/apicodev/example-react-todo-google-sheets.git
```

2. CD into the reposity and install the dependencies

```
$ cd example-react-todo-google-sheets
$ npm install
```

3. Login to your [Apico](https://apico.dev) account and create a new Google sheets integration. Note the integration ID in the Readme.md file.

4. Login to your [Google Sheets](https://sheets.google.com) account and create a new Google Sheet and note down the URL

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

5. Open the `/src/api/sheet.ts` file and replace the variables in the following lines
```
...
const apicoIntegrationId: string = "<Replace with your apico gsheet integration id>";
const spreadSheetId: string = "<Replace with your google sheet id>";
const sheetName: string = "Sheet1"; // replace with your sheet name
const sheetId: number = 1196872439; // replace with your sheet/page gid (not sheet name)
...
```

6. Finally run the project!
```
npm run dev
```
