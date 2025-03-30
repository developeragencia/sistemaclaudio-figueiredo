import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Atalhos() {
  const shortcuts = [
    {
      category: 'Navegação Principal',
      items: [
        { keys: ['mod', '1'], description: 'Dashboard' },
        { keys: ['mod', '2'], description: 'Menu Empresas' },
        { keys: ['mod', '3'], description: 'Menu Auditoria' },
        { keys: ['mod', '4'], description: 'Menu Financeiro' },
        { keys: ['mod', '5'], description: 'Menu Documentos' },
        { keys: ['mod', '6'], description: 'Menu Relatórios' },
        { keys: ['mod', '7'], description: 'Menu Agenda' },
        { keys: ['mod', '8'], description: 'Notificações' },
        { keys: ['mod', 'k'], description: 'Busca Avançada' },
        { keys: ['mod', '9'], description: 'Menu Usuários' },
        { keys: ['mod', '0'], description: 'Menu Configurações' }
      ]
    },
    {
      category: 'Empresas',
      items: [
        { keys: ['mod', 'shift', 'c'], description: 'Cadastro de Empresas' },
        { keys: ['mod', 'shift', 'n'], description: 'Consulta CNPJ' },
        { keys: ['mod', 'shift', 'h'], description: 'Histórico de Consultas' }
      ]
    },
    {
      category: 'Auditoria',
      items: [
        { keys: ['mod', 'shift', 'r'], description: 'Retenções' },
        { keys: ['mod', 'shift', 'a'], description: 'Análise de Notas' },
        { keys: ['mod', 'shift', 'p'], description: 'Pendências' }
      ]
    },
    {
      category: 'Interface',
      items: [
        { keys: ['mod', 'b'], description: 'Alternar menu lateral' },
        { keys: ['mod', 'j'], description: 'Alternar tema claro/escuro' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Atalhos de Teclado</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {shortcuts.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>
                  {category.category === 'Interface'
                    ? 'Atalhos para controle da interface'
                    : `Atalhos para ${category.category.toLowerCase()}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span>{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <kbd
                            key={keyIndex}
                            className="rounded bg-muted px-2 py-1 text-sm font-semibold"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
            <CardDescription>Informações importantes sobre os atalhos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>mod</strong> representa a tecla <kbd className="rounded bg-muted px-2 py-1">⌘ Command</kbd> no
              macOS e <kbd className="rounded bg-muted px-2 py-1">Ctrl</kbd> no Windows/Linux.
            </p>
            <p>
              Alguns atalhos podem não funcionar se houver conflito com atalhos do
              sistema operacional ou do navegador.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 