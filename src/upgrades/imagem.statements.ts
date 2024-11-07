export const ImagemUpgradeStatements = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS imagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path STRING NOT NULL
            );`,
        ],
    },
]