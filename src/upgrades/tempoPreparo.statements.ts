export const TempoPreparoUpgradeStatements = [
    {
      toVersion: 1,
      statements: [
          `CREATE TABLE IF NOT EXISTS tempos_preparo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            valor TEXT,
          );`,
      ],
    },
]
