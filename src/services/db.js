import * as SQLite from "expo-sqlite";

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync("monthlyspending.db");

  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS spending (id INTEGER PRIMARY KEY AUTOINCREMENT, amount TEXT, categoryName TEXT, categoryImage TEXT, date TEXT, notes TEXT);
      CREATE TABLE IF NOT EXISTS savedcategories (id INTEGER PRIMARY KEY AUTOINCREMENT, categoryName TEXT, categoryImage TEXT);
    `);
};

export const insertItem = async (amount, categoryName, categoryImage, date, notes) => {
  try {
    await db.runAsync(
      "INSERT INTO spending (amount, categoryName, categoryImage, date, notes) VALUES (?, ?, ?, ?, ?)",
      [amount, categoryName, categoryImage, date, notes]
    );
  } catch (e) {
    throw e;
  }
};

export const getItems = async () => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM spending");
    return allRows;
  } catch (err) {
    throw err;
  }
};

export const getSavedCategories = async () => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM savedcategories");
    return allRows;
  } catch (err) {
    throw err;
  }
};

export const addToCategories = async (categoryName, categoryImage) => {
  try {
    await db.runAsync("INSERT INTO savedcategories (categoryName, categoryImage) VALUES (?, ?)", [
      categoryName,
      categoryImage,
    ]);
  } catch (e) {
    throw e;
  }
};

export const editCategories = async (id, categoryName, categoryImage) => {
  try {
    await db.runAsync("UPDATE savedcategories SET categoryName = ?, categoryImage = ? WHERE id = ?", [
      categoryName,
      categoryImage,
      id,
    ]);
  } catch (e) {
    throw e;
  }
};

export const deleteCategories = async (id) => {
  try {
    await db.runAsync("DELETE FROM savedcategories WHERE id = ?", [id]);
  } catch (e) {
    throw e;
  }
};

// Eg. 2024_05
export const getItemsByMonth = async (year_month = "") => {
  let currentYearMonth;

  if (!year_month) {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    currentYearMonth = `${currentYear}_${currentMonth}`;
  } else {
    currentYearMonth = year_month;
  }

  try {
    const query = `SELECT * FROM spending WHERE date LIKE '${currentYearMonth}_%' ORDER BY id DESC`;
    const thisMonthRows = await db.getAllAsync(query);

    return thisMonthRows;
  } catch (err) {
    throw err;
  }
};

export const getSpendingGroupedByMonth = async () => {
  try {
    const query = `
    SELECT 
      SUBSTR(date, 1, 7) AS year_month, 
      SUM(CAST(REPLACE(amount, '.', '') AS INTEGER)) AS total_amount 
    FROM 
      spending 
    GROUP BY 
      year_month
  `;

    const result = await db.getAllAsync(query);
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateItem = async (id, amount, categoryName, categoryImage, date, notes) => {
  try {
    await db.runAsync(
      "UPDATE spending SET amount = ?, categoryName = ?, categoryImage = ?, date = ?, notes = ? WHERE id = ?",
      [amount, categoryName, categoryImage, date, notes, id]
    );
  } catch (err) {
    throw err;
  }
};

export const updateCategoryName = async (prevValue, newValue) => {
  try {
    await db.runAsync("UPDATE spending SET categoryName = ? WHERE categoryName = ?", [newValue, prevValue]);
  } catch (err) {
    throw err;
  }
};

export const updateCategoryImage = async (prevValue, newValue) => {
  try {
    await db.runAsync("UPDATE spending SET categoryImage = ? WHERE categoryImage = ?", [newValue, prevValue]);
  } catch (err) {
    throw err;
  }
};

export const deleteItem = async (id) => {
  await db.runAsync("DELETE FROM spending WHERE id = ?", [id]);
};

export const getAllTables = async () => {
  try {
    const tables = await db.getAllAsync(`
        SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
      `);
    return tables;
  } catch (err) {
    throw err;
  }
};

export const clearTable = async () => {
  try {
    const clearSpending = db.runAsync(`DELETE FROM spending`);
    const clearSavedCategories = db.runAsync(`DELETE FROM savedcategories`);
    await Promise.all([clearSpending, clearSavedCategories]);
  } catch (err) {
    throw err;
  }
};

export const deleteTable = async (tableName) => {
  try {
    await db.runAsync(`DROP TABLE IF EXISTS ${tableName}`);
  } catch (err) {
    throw err;
  }
};
