export const ImagemUpgradeStatements = [
    {
      toVersion: 1,
      statements: [
          `CREATE TABLE IF NOT EXISTS imagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            receita_id INTEGER NOT NULL,
            FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
          );`,
      ],
    },
  ]
