## Passo 4: Personalizando nossa Extensão

Ótimo trabalho colocando sua extensão para funcionar! :tada:
É legal ver o Copilot respondendo, não é?! :sunglasses:

Agora vamos para a parte divertida, onde personalizamos a extensão para apoiar a equipe da nossa escola de ensino médio! :unicorn:

Mas, antes disso, vamos falar sobre a natureza das mensagens trocadas com o GitHub Copilot e o conceito de "passagem de contexto".

### O que é contexto?

Simplificando, contexto é a informação que você fornece ao GitHub Copilot para que ele possa dar uma resposta mais informada. Isso pode ser pedir para o Copilot assumir uma persona, fornecer dados de fundo ou fazer uma pergunta específica.

Para esta aplicação, isso significa objetos JSON com um papel definido e algum conteúdo de texto. No nosso caso, vamos anexar algumas mensagens `system` que se parecem com o exemplo abaixo. Quando o usuário interage com o GitHub Copilot, você verá essas mensagens anexadas como o papel `user`.

```json
{
  "role": "system",
  "content": "Você é um desenvolvedor de software criando programas desktop e web para apoiar a equipe de uma escola de ensino médio."
}
```

### :keyboard: Atividade: Configurando nossa extensão

Personalizar o Copilot é bem simples. É como compartilhar mais informações com um colega de trabalho.
Você só precisa adicionar mais contexto para ajudá-lo a tomar decisões melhores.

Vamos fazer isso aqui com alguns arquivos markdown que podem ser facilmente atualizados sem risco de quebrar a extensão.

1. Abra o VS Code e expanda a pasta `/ghc-extension-js`.
1. Vamos dar uma descrição de cargo para o nosso Agente da extensão. Todo mundo gosta de clareza no trabalho, certo?

   1. Abra o arquivo `index.js` e encontre onde as mensagens são carregadas (por volta da linha 35) e descomente as linhas abaixo.
      Isso vai inserir a descrição do cargo do agente no início do contexto do Copilot, ou seja, na "memória de curto prazo".

      ```js
      const messages = payload.messages; // Após esta linha, adicione o código abaixo

      // Adiciona a descrição do cargo do agente às mensagens do copilot
      const jobDescription = await fs.readFile(
        path.join(__dirname, "agent-knowledge", "job-description.md"),
        "utf8"
      );
      messages.unshift({
        role: "system",
        content: jobDescription,
      });
      ```

   1. Abra o arquivo `/agent-knowledge/job-description.md` e substitua o conteúdo pelo texto abaixo.

      ```markdown
      Você é um desenvolvedor de software apoiando a equipe de uma escola de ensino médio.
      Seu objetivo é fornecer serviços de automação e ferramentas para ajudá-los a trabalhar mais rápido.
      ```

      > **Dica:** Você pode adicionar mais detalhes à sua descrição. Veja o arquivo `job-description-ext.md` para ideias.

1. Agora, repita o processo acima para mais 2 arquivos.
1. Modifique o `index.js` para também usar `/agent-knowledge/school-overview.md` com o conteúdo abaixo como exemplo.

   ```markdown
   Este é um panorama da escola de ensino médio para que os instrutores possam descrever suas necessidades de forma mais natural.

   - O nome da escola é "Mergington High School"
   - A escola é uma escola pública em Mergington, Flórida.
   - O lema da escola é "Branch out and grow".
   - Atende do 9º ao 12º ano e normalmente tem de 100 a 150 alunos por série.

   - O ano letivo começa em agosto e termina em maio.
   - São 3 trimestres por ano.
   - Existe um 4º ciclo de verão, mas ele é opcional.
   ```

   > **Dica:** Você pode adicionar mais detalhes à sua descrição. Veja o arquivo `school-overview-ext.md` para ideias.

1. Modifique o `index.js` para também usar `/agent-knowledge/staff-roles.md` com o conteúdo abaixo.

   ```markdown
   Abaixo está uma lista de funções comuns e tarefas com as quais eles podem querer ajuda.
   Se um usuário especificar seu papel, você pode usar essa informação para fornecer sugestões mais direcionadas ou oferecer formas de ajudá-lo.

   ## Administração Escolar

   - Gestão orçamentária e alocação de recursos
   - Recrutamento, gestão e desenvolvimento de funcionários
   - Planos de melhoria escolar, definição de visão e construção de cultura
   - Relações com a comunidade

   ## Corpo Docente

   - Planejamento curricular e design de aulas
   - Avaliação e acompanhamento de desempenho
   - Personalização de cursos e diferenciação para alunos
   - Comunicação com pais e apoio aos alunos
   - Gestão de sala de aula e sistemas de comportamento
   ```

   > **Dica:** Você pode adicionar mais detalhes à sua descrição. Veja o arquivo `staff-roles-ext.md` para ideias.

1. Ótimo trabalho! Agora temos uma descrição de cargo e algum contexto para nossa extensão usar. Vamos testar!
1. Se o serviço da extensão ainda não estiver rodando, use o depurador para iniciá-lo.
1. Como antes, acesse [github.com](https://github.com) e inicie um chat genérico com o Copilot.
1. Tente interagir com o Copilot usando alguns dos prompts abaixo. Certifique-se de estar no modo **Perguntar**.

   > <img width="13px" src="https://github.com/user-attachments/assets/98fd5d2e-ea29-4a4a-9212-c7050e177a69" /> **Prompt**
   >
   > ```prompt
   > @my-ghc-extension-{{login | lower}} Ouvi dizer que você pode me ajudar com meus alunos. De que formas?
   > ```

   > <img width="13px" src="https://github.com/user-attachments/assets/98fd5d2e-ea29-4a4a-9212-c7050e177a69" /> **Prompt**
   >
   > ```prompt
   > @my-ghc-extension-{{login | lower}} Conte-me um pouco sobre nossa escola?
   > ```

   > <img width="13px" src="https://github.com/user-attachments/assets/98fd5d2e-ea29-4a4a-9212-c7050e177a69" /> **Prompt**
   >
   > ```prompt
   > @my-ghc-extension-{{login | lower}} Gostaria de criar um sistema para acompanhar o progresso dos alunos
   > ao longo dos anos e professores. Vamos criar um site para isso.
   > ```

   > <img width="13px" src="https://github.com/user-attachments/assets/98fd5d2e-ea29-4a4a-9212-c7050e177a69" /> **Prompt**
   >
   > ```prompt
   > @my-ghc-extension-{{login | lower}} Como posso visualizar dados exportados do nosso sistema de gestão de alunos?
   > Por exemplo, um gráfico das notas de cada aluno ao longo do ano.
   > ```

1. Quando terminar de experimentar os prompts e alterar os arquivos, faça commit e push das mudanças.
   - Certifique-se de estar no branch `my-ghc-extension`.
   - O Git deve mostrar alterações em 4 arquivos:
     - `index.js`
     - `agent-knowledge/job-description.md`
     - `agent-knowledge/school-overview.md`
     - `agent-knowledge/staff-roles.md`
