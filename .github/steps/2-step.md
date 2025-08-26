## Passo 2: Executando nossa Extensão

Vamos aprender um pouco mais sobre a aplicação web que se tornará nossa Extensão do GitHub Copilot, mais especificamente, os endpoints necessários para a comunicação com nosso [GitHub App](https://docs.github.com/pt/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps) (próximo passo).

Existem 2 endpoints obrigatórios e 1 recomendado para o serviço web:

- **[GET] /callback** – Uma mensagem HTML simples fornecida ao usuário após a autorização para confirmar que a extensão tem permissões.
- **[POST] /copilot** – Um endpoint de resposta para trocar mensagens com o GitHub Copilot.
- **[GET] /** – (Opcional) Uma resposta padrão da raiz do seu serviço web para visualização em um navegador comum, fornecendo uma visão geral da extensão.

> [!NOTA]
> Os endpoints `/callback` e `/copilot` podem ser renomeados como desejar. Eles só precisam corresponder às configurações do GitHub App.

### :keyboard: Atividade: Executando nossa extensão

Antes de começarmos a personalizar, vamos tentar executar a extensão modelo que foi fornecida.

1. No VS Code, expanda o painel inferior (Ctrl+J) e selecione a aba **Terminal**.

1. Execute o comando abaixo para instalar os pacotes JavaScript necessários.

   ```bash
   cd ghc-extension-js
   npm install
   ```

1. Configure as portas abertas.

   1. Na barra do painel inferior, selecione a aba **Ports**.
   1. Verifique se a porta `3000` está ativa e a visibilidade está como `public`.
   1. Se a visibilidade da porta não estiver como `public`, clique com o botão direito na entrada e selecione **Port Visibility** para atualizá-la.

1. Verifique se o programa modelo incluído está funcionando.

   1. Na barra de navegação à esquerda, selecione o ícone de depuração.
   1. Clique no botão verde de play para iniciar o depurador.
   1. O programa deve rodar e exibir um texto como: `Copilot extension service running at: {URL}`
   1. Este é o URL global da sua extensão rodando neste codespace.

1. Verifique se nosso serviço de extensão está rodando.

   1. Na barra do painel inferior, volte para a aba **Ports**.
   1. Clique com o botão direito no URL e selecione **Open in Browser**.
   1. Você deve ver uma página web descrevendo sua extensão!

1. Deixe o depurador rodando para manter o serviço ativo e adicione um comentário na issue usando o exemplo abaixo. Certifique-se de marcar a Professora Octocat para notificá-la e atualizar o link!

   ```markdown
   Olá @professortocat, por favor verifique se meu codespace está rodando corretamente.

   https://meu-link-do-codespace-3000.app.github.dev
   ```

> [!IMPORTANTE]
> Quando você reinicia um Codespace, as portas expostas são redefinidas.
> Isso pode significar que elas são removidas ou mudam para visibilidade privada.
