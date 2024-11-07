export const ReceitaUpgradeStatements = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS receitas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            fk_imagens INTEGER NOT NULL,
            descricao TEXT NOT NULL,
            fk_preparo INTEGER NOT NULL,
            fk_tempo_preparo INTEGER NOT NULL,
            fk_porcao INTEGER NOT NULL,
            fk_utensilios INTEGER NOT NULL,
            data_criacao: DATE NOT NULL,
            FOREIGN KEY(fk_imagens) REFERENCES images(id),
            FOREIGN KEY(fk_preparo) REFERENCES preparos(id),
            FOREIGN KEY(fk_tempo_preparo) REFERENCES preparos(id),
            FOREIGN KEY(fk_porcao) REFERENCES porcoes(id),
            FOREIGN KEY(fk_utensilios) REFERENCES utensilios(id),
            );`,
        ],
    },
]