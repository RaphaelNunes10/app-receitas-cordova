export const UtensilioUpgradeStatements = [
  {
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS utensilios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          list_index INTEGER,
          quantidade INTEGER,
          utensilio TEXT,
          receita_id INTEGER NOT NULL,
          FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
        );`,
    ],
  },
]
