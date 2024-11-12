export const IngredienteUpgradeStatements = [
    {
      toVersion: 1,
      statements: [
          `CREATE TABLE IF NOT EXISTS ingredientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            list_index INTEGER NOT NULL,
            quantidade DECIMAL(6, 2) NOT NULL,
            medida TEXT NOT NULL,
            ingrediente TEXT NOT NULL,
            receita_id INTEGER NOT NULL,
            FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
          );`,
      ],
    },
]
