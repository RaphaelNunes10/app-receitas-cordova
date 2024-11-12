export const PorcaoUpgradeStatements = [
    {
      toVersion: 1,
      statements: [
          `CREATE TABLE IF NOT EXISTS porcoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantidade DECIMAL(6, 2),
            medida TEXT
          );`,
      ],
    },
]
