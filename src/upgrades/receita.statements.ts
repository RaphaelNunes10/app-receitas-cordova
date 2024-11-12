export const ReceitaUpgradeStatements = [
    {
      toVersion: 1,
      statements: [
          `CREATE TABLE IF NOT EXISTS receitas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            list_index INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            data_criacao DATETIME NOT NULL,
            tempo_preparo_id INTEGER,
            porcao_id INTEGER,
            FOREIGN KEY (tempo_preparo_id) REFERENCES tempos_preparo(id),
            FOREIGN KEY (porcao_id) REFERENCES porcoes(id)
          );`,
      ],
    },
]
