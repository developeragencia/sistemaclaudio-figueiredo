# Sistema Claudio Figueiredo

Sistema de gerenciamento empresarial integrado.

## Tecnologias Utilizadas

### Backend
- FastAPI
- SQLModel
- PostgreSQL
- Celery
- Redis
- JWT + 2FA

### Frontend
- React.js
- Chakra UI
- React Query
- Zustand
- Formik + Yup

## Pré-requisitos

- Docker e Docker Compose
- Node.js 18+
- Python 3.9+

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bueiro-digital.git
cd bueiro-digital
```

2. Configure as variáveis de ambiente:
```bash
cp backend/.env.example backend/.env
# Edite o arquivo .env com suas configurações
```

3. Inicie os containers:
```bash
docker-compose up -d
```

4. Execute as migrações do banco de dados:
```bash
docker-compose exec backend alembic upgrade head
```

5. Crie um superusuário:
```bash
docker-compose exec backend python -m scripts.create_superuser
```

## Desenvolvimento

### Backend

O backend estará disponível em `http://localhost:8000`

API Docs:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend

O frontend estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   └── alembic/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
└── infrastructure/
    └── docker/
```

## Funcionalidades Principais

- Autenticação com JWT e 2FA para perfis críticos
- Gerenciamento de usuários e permissões
- Cadastro e monitoramento de bueiros
- Gestão de manutenções e ocorrências
- Relatórios e dashboards
- Notificações em tempo real
- Processamento assíncrono de tarefas

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
