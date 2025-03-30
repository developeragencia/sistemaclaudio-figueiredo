# Sistema Claudio Figueiredo

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/developeragencia/sistemaclaudio-figueiredo.git
cd sistemaclaudio-figueiredo
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo .env com suas configurações

## Desenvolvimento

Para rodar o projeto em desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## Build e Deploy

1. Para gerar o build de produção:
```bash
npm run build
# ou
yarn build
```

2. Para testar o build localmente:
```bash
npm run preview
# ou
yarn preview
```

## Deploy na Vercel

1. Faça fork do repositório
2. Conecte com sua conta Vercel
3. Configure as variáveis de ambiente na Vercel
4. Deploy!

## Tecnologias

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- React Router DOM
- React Query
- Zod
- React Hook Form

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── lib/           # Utilitários e configurações
  ├── pages/         # Páginas da aplicação
  ├── styles/        # Estilos globais
  └── types/         # Definições de tipos TypeScript
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
