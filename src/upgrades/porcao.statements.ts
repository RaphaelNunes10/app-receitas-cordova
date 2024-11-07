export const PorcaoUpgradeStatements = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS porcoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantidade INTEGER NOT NULL,
            medida TEXT NOT NULL
            );`,
        ],
    },
]