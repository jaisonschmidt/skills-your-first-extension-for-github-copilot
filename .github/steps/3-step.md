## Passo 3: Conectando ao GitHub

Um componente fundamental para usar nossa extensão é criar um [GitHub App](https://docs.github.com/pt/apps/overview), que será responsável por apresentar nossa extensão ao usuário e fornecer autorização para recursos. Na verdade, GitHub Apps podem ser usados para muitas coisas, como gerenciar issues, comentar em pull requests e até mesmo se comunicar com outros serviços como o Slack.

Para nossa extensão, será semelhante a conversar com outro serviço, exibindo-o em um chat de uso geral no github.com e no Copilot Chat do Visual Studio Code.

> [!DICA]
> Se quiser saber mais sobre essas e outras capacidades, confira a página [Visão geral dos GitHub Apps](https://docs.github.com/pt/apps/overview).

### :keyboard: Atividade: Conectando ao GitHub

Vamos criar um GitHub App, configurá-lo para funcionar com o GitHub Copilot como um Agente e instalá-lo na sua conta.

1. Acesse o GitHub.com
1. No canto superior direito, clique na sua foto de perfil e depois em **Configurações**.
1. Na barra lateral esquerda, na parte inferior, selecione **Configurações do desenvolvedor**.
1. Na barra lateral esquerda, na parte superior, selecione **GitHub Apps**.
1. Clique no botão **Novo GitHub App**.
1. No formulário exibido, preencha o seguinte:
   1. Na seção **Registrar novo GitHub App**, preencha:
      - **Nome do GitHub App**: `my-ghc-extension-{{login}}`
        - O nome do app deve ser único em todo o GitHub.
        - Nota: O identificador no Copilot Chat será em minúsculas, como `@my-ghc-extension-{{login | lower}}`.
      - **Descrição**: `Minha primeira extensão para o GitHub Copilot`
      - **URL da página inicial**: Qualquer URL que forneça uma visão geral e instruções de uso para sua extensão.
        - Usaremos a página de informações do nosso serviço web. Este é o URL exibido no console ao rodar a extensão, mais `/info`.
        - Exemplo: `https://conscious-jumper-abcdefg-3000.app.github.dev/info`
   1. Na seção **Identificando e autorizando usuários**, preencha:
      - **URL de callback**: O URL exibido no console ao rodar a extensão, mais `/callback`.
        - Exemplo: `https://conscious-jumper-abcdefg-3000.app.github.dev/callback`
      - **Expirar tokens de autorização do usuário**: `[x] Marcado`
      - **Solicitar autorização do usuário (OAuth) durante a instalação**: `[x] Marcado`
      - **Habilitar Device Flow**: `[ ] Desmarcado`
   1. Na seção **Webhook**, preencha:
      - **Ativo**: `[ ] Desmarcado`
   1. Na seção **Permissões**, selecione as seguintes permissões:
      - Repositório: `Nenhuma`
      - Organização: `Nenhuma`
      - Conta:
        - **Copilot Chat**: `somente leitura`
   1. Na seção **Onde este GitHub App pode ser instalado?**, selecione:
      - `Apenas nesta conta`
1. Clique em **Criar GitHub App**.
1. Na barra lateral esquerda, clique em **Copilot**.
   - Se for a primeira vez criando uma extensão Copilot, será solicitado que aceite os termos.
1. No menu suspenso **Tipo de App**, selecione `Agente`. Preencha os seguintes detalhes:
   - **URL de pré-autorização**: Deixe em branco
   - **Definição do Agente > URL**: O URL exibido no console ao rodar a extensão, mais `/copilot`.
     - Exemplo: `https://conscious-jumper-abcdefg-3000.app.github.dev/copilot`
   - **Descrição da Inferência**: `Minha primeira extensão para o GitHub Copilot`
     - Isso será exibido como uma dica de ferramenta na interface do chat do Copilot.
1. Clique em **Salvar**.
1. Na barra lateral esquerda, clique em **Instalar App**.
1. Clique em **Instalar** e depois em **Instalar e Autorizar**.

### :keyboard: Atividade: Testando a conexão

Vamos verificar se nosso serviço de extensão está disponível para uso no github.com e no nosso IDE, e se eles conseguem se comunicar.

1. No VS Code, use o depurador para iniciar o serviço da extensão, caso ainda não esteja rodando.
1. Abra um navegador e acesse [github.com](https://github.com).
1. No topo da página, clique no **Ícone do Copilot**.
1. Inicie um chat de uso geral.
1. Digite `@my-ghc-extension-{{login | lower}} Como você pode me ajudar?` e pressione enter. Você deve receber uma resposta.
   > **Dica:** Tente abrir outra janela do VS Code. Você pode usar a extensão lá também com o Copilot Chat!
1. Depois de terminar de configurar seu **GitHub App** e testar a conexão, deixe o seguinte comentário na issue para avisar a Mona que você está pronto para o próximo passo.

   ```markdown
   Olá @professortocat, terminei de configurar meu GitHub App. Aqui está o link. O que vem agora?

   https://github.com/apps/my-ghc-extension-{{login}}
   ```
