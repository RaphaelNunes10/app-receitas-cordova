export class ReceitaUpgradeStatements {
  receitaUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS receitas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          list_index INTEGER NOT NULL,
          titulo TEXT NOT NULL,
          descricao TEXT NOT NULL,
          tempo_preparo TEXT,
          porcao_quantidade DECIMAL(6, 2),
          porcao_medida TEXT
          data_criacao DATETIME NOT NULL,
        );`,
      ],
    },
  ];

  imagemUpgrades = [
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
  ];

  ingredienteUpgrades = [
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
  ];

  utensilioUpgrades = [
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
  ];

  preparoUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS preparos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          list_index INTEGER NOT NULL,
          passo TEXT NOT NULL,
          receita_id INTEGER NOT NULL,
          FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
        );`,
      ],
    },
  ];
}
