export const IngredienteUpgradeStatements = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS ingredientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            list_index INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            medida TEXT NOT NULL,
            ingrediente TEXT NOT NULL
            );`,
        ],
    },
]