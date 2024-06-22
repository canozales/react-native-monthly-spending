import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const convertArrayToCSV = (data) => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      let value = row[header];
      if (value === "") {
        value = "null";
      }
      return value;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

const saveFile = async (filename, content) => {
  const fileUri = FileSystem.documentDirectory + filename;
  await FileSystem.writeAsStringAsync(fileUri, content);
  return fileUri;
};

export const exportCsv = async (theArray, fileName = "spending-history") => {
  try {
    const csvData = convertArrayToCSV(theArray);
    const fileUri = await saveFile(`${fileName}.csv`, csvData);

    await Sharing.shareAsync(fileUri);
  } catch (error) {
    throw error;
  }
};
