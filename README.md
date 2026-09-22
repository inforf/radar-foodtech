# Radar Foodtech

Publicação independente sobre tecnologia, operação e qualidade de software no mercado de alimentação.

🌐 [Acessar o site](https://inforf.github.io/radar-foodtech/)  
👤 [Ronaldo Ferreira no LinkedIn](https://www.linkedin.com/in/ronaldo-ferreira-qa)

## Proposta editorial

Analisar foodtechs além da lista de funcionalidades, considerando:

- confiabilidade na operação real;
- experiência do cliente e da equipe;
- integrações entre canais;
- riscos de negócio e qualidade de software;
- sustentabilidade técnica e comercial.

As publicações não representam fornecedores específicos. Quando houver patrocínio, parceria ou vínculo comercial, isso deverá ser informado no próprio conteúdo.

## Estrutura

```text
radar-foodtech/
├── _includes/       Cabeçalho, rodapé e controles de privacidade
├── _layouts/        Modelos compartilhados entre as páginas
├── _posts/          Artigos escritos em Markdown
├── assets/
│   ├── css/         Estilos visuais e responsivos
│   ├── img/         Imagens, capas e ícones
│   └── js/          Privacidade e integração com o Clarity
├── 404.html         Página para endereços inexistentes
├── feed.xml         Feed RSS/Atom das publicações
├── index.html       Página inicial
├── privacidade.md   Política de privacidade
└── sobre.md         Apresentação do projeto e do autor
```

Os nomes iniciados por `_` são convenções do Jekyll, gerador utilizado pelo GitHub Pages.

## Como publicar um artigo

### 1. Criar o arquivo

Dentro da pasta `_posts/`, crie um arquivo seguindo este formato:

```text
AAAA-MM-DD-titulo-do-artigo.md
```

Exemplo:

```text
2026-10-15-integracao-importa-mais-que-funcionalidades.md
```

Use letras minúsculas, hífens e evite acentos no nome do arquivo.

### 2. Preencher o cabeçalho

Todo artigo começa com:

```yaml
---
layout: post
title: "Título exibido para o leitor"
description: "Resumo curto utilizado na página inicial e nos buscadores."
category: Tendências
reading_time: 6 min de leitura
takeaway: "A principal conclusão do artigo em uma frase."
---
```

### 3. Escrever em Markdown

```markdown
Introdução do artigo.

## Primeiro assunto

Texto do primeiro assunto.

### Um detalhe importante

- Primeiro ponto;
- segundo ponto;
- terceiro ponto.
```

### 4. Revisar antes de publicar

- conferir título, data e descrição;
- verificar se afirmações possuem fontes;
- remover nomes ou informações internas sem autorização;
- testar todos os links;
- usar títulos em ordem: `##` e depois `###`;
- incluir texto alternativo em imagens;
- conferir a leitura no celular;
- não utilizar apenas cor para transmitir informação.

### 5. Publicar

Ao salvar o arquivo na branch `main`, o GitHub Pages atualiza o site automaticamente. O novo artigo também aparece na página inicial e no feed.

## Imagens dos artigos

Crie uma pasta própria para cada publicação:

```text
assets/img/artigos/nome-do-artigo/
```

No Markdown:

```markdown
![Descrição objetiva do que aparece na imagem]({{ '/assets/img/artigos/nome-do-artigo/imagem.webp' | relative_url }})
```

Prefira arquivos `.webp` otimizados. Evite imagens que contenham dados pessoais, informações internas ou capturas sem contexto.

## Microsoft Clarity e privacidade

O Clarity é carregado somente após consentimento explícito do visitante.

- projeto do Radar: `ym3ipytmvs`;
- armazenamento analítico: depende da autorização;
- armazenamento publicitário: sempre negado;
- preferência: salva localmente no navegador;
- alteração da escolha: disponível no rodapé e na página de privacidade.

A integração fica em `assets/js/global.js`. Como o arquivo é carregado pelo layout principal, ela funciona em todas as páginas e publicações.

## Acessibilidade

O projeto inclui:

- link para pular diretamente ao conteúdo;
- HTML semântico;
- foco visível para navegação por teclado;
- contraste mínimo revisado nos controles;
- modal de privacidade com retorno de foco e contenção do teclado;
- suporte a redução de movimento;
- layout responsivo.

Novas alterações devem preservar esses comportamentos.

## Tecnologias

- HTML;
- CSS;
- JavaScript;
- Markdown;
- Jekyll;
- GitHub Pages;
- Microsoft Clarity Consent API V2.
