import axios, { AxiosRequestConfig } from "axios";

const apicoIntegrationId: string = "<Replace with your apico gsheet integration id>";
const spreadSheetId: string = "<Replace with your google sheet id>";
const sheetName: string = "Sheet1"; // replace with your sheet name
const sheetId: number = 1196872439; // replace with your sheet/page gid (not sheet name)
// you can look at the URL of your spread sheet in the browser to find the gid

const apiBaseUrl = `https://api.apico.dev/v1/${apicoIntegrationId}/${spreadSheetId}`;

export interface SpreadSheetResponse {
  values: string[][];
}
export const getSpreasheetData = async () => {
  const response = await axios.get<SpreadSheetResponse>(
    `${apiBaseUrl}/values/${sheetName}`
  );
  return response.data;
};

/**
 * Function to append data to the spreadsheet
 * @param data string[]
 * @returns
 */
export const appendSpreadsheetData = async (
  data: (string | number | boolean)[]
) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${apiBaseUrl}/values/${sheetName}:append`,
    params: {
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: true,
    },
    data: {
      values: [data],
    },
  };

  const response = await axios(options);
  return response.data;
};

export const updateSpreadsheetData = async (
  index: number,
  values: (string | number | boolean)[]
) => {
  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `${apiBaseUrl}/values/${sheetName}!A${index + 1}`,
    params: {
      valueInputOption: "USER_ENTERED",
      includeValuesInResponse: true,
    },
    data: {
      values: [values],
    },
  };

  const response = await axios(options);
  return response.data;
};

export const deleteSpreadsheetRow = async (index: number) => {
  const range = {
    sheetId: sheetId,
    dimension: "ROWS",
    startIndex: index,
    endIndex: index+1,
  };
  console.log(`deleting row from ${range.startIndex} to ${range.endIndex}`)
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${apiBaseUrl}:batchUpdate`,
    data: {
      requests: [
        {
          deleteDimension: {
            range,
          },
        },
      ],
    },
  };

  const response = await axios(options);
  return response.data;
};
