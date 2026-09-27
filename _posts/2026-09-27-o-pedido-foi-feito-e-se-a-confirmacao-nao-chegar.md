---
layout: post
date: 2026-09-27 01:30:00 -0300
title: "O pedido foi feito. E se a confirmação não chegar?"
description: "Uma falha de conexão pode deixar cliente e restaurante sem saber se o pedido entrou. Como desenhar e testar a recuperação desse fluxo?"
category: Operação sob teste
image: /assets/img/artigos/capa-pedido-confirmacao.png
image_alt: "Capa editorial com a pergunta sobre a confirmação de um pedido e um celular com símbolo de dúvida."
reading_time: 6 min de leitura
takeaway: "Quando a confirmação falha, o sistema precisa mostrar o estado real do pedido e permitir uma recuperação segura."
---

Imagine a cena: o cliente escolhe o jantar, confirma o pedido e a tela fica carregando. Alguns segundos depois, aparece uma mensagem de erro.

Ele tenta novamente. A cozinha recebe dois pedidos iguais? O pagamento foi cobrado uma vez, duas vezes ou nenhuma? O atendente consegue descobrir o que aconteceu sem pedir que o cliente conte a história inteira?

Essa situação é hipotética, mas as perguntas são bem reais para quem desenvolve ou testa um fluxo de pedidos. Uma falha de conexão não deveria deixar a operação adivinhando o resultado.

## O problema não é só o botão que travou

Em um pedido online, várias etapas podem ocorrer em sistemas diferentes: registrar o pedido, autorizar o pagamento, avisar a cozinha, atualizar a disponibilidade e enviar a confirmação ao cliente.

Essas etapas nem sempre terminam juntas. Pode acontecer de o servidor registrar o pedido e a resposta não chegar ao celular. A interface mostra “erro”, mas o pedido já existe. Também pode acontecer o contrário: a tela parecer concluída e a cozinha não receber nada.

Por isso, uma mensagem genérica como “Tente novamente” pode ser perigosa. Antes de oferecer uma segunda tentativa, o produto precisa saber **em que estado a primeira ficou**.

## Três perguntas que a interface deveria responder

**1. O pedido entrou?** A pessoa precisa de uma confirmação identificável, como número e horário do pedido, acessível mesmo depois de fechar a tela.

**2. O pagamento foi concluído?** O status deve corresponder ao que ocorreu de fato. “Pagamento em processamento” é diferente de “pagamento aprovado” e de “pedido aceito pelo restaurante”.

**3. O que fazer agora?** Se houver atraso ou falha, o sistema deve indicar se é melhor aguardar, consultar o pedido ou falar com o atendimento. Pedir para tentar tudo de novo sem verificar o estado anterior transfere o risco para o cliente.

Nos bastidores, o mesmo raciocínio vale para a equipe: é preciso conseguir localizar o pedido, entender as mudanças de estado e identificar uma possível duplicidade.

## Como testar antes da sexta-feira à noite

Eu começaria pelo caminho normal e depois interromperia o fluxo em pontos específicos. Não basta verificar se o botão funciona quando a internet está estável.

- **Resposta atrasada:** o pedido é registrado, mas a confirmação demora. O que aparece para o cliente? Ele consegue consultar o estado sem gerar outro pedido?
- **Toque repetido:** a pessoa pressiona “Finalizar” duas vezes ou volta à tela e tenta de novo. O sistema evita criar uma segunda compra por acidente?
- **Falha depois do pagamento:** o pagamento é aprovado, mas a comunicação com o restaurante falha. Existe um estado visível e uma forma de conciliar o ocorrido?
- **Falha na integração:** a plataforma recebe o pedido, mas a cozinha não. Quem é alertado? Há rastros suficientes para recuperar a operação?
- **Retorno da conexão:** depois de ficar offline, o aplicativo ou navegador mostra o pedido verdadeiro ou mantém uma tela desatualizada?

Uma proteção importante é tratar novas tentativas do **mesmo pedido** de forma segura. O desenho técnico pode variar, mas o resultado esperado é simples: uma tentativa repetida não deve virar automaticamente um novo pedido ou uma nova cobrança.

## O que medir depois

Um teste aprovado não encerra o assunto. Eu acompanharia quantos pedidos ficam sem confirmação clara, quantos exigem intervenção manual, quanto tempo a equipe leva para identificar o estado correto e quantas duplicidades são detectadas.

Essas medidas ajudam a distinguir um problema raro de uma falha que reaparece justamente quando o movimento aumenta. Também dão prioridade ao que mais afeta clientes e restaurante.

## Confiabilidade é parte da experiência

No [primeiro artigo do Radar]({{ '/artigos/o-cardapio-digital-ainda-tem-futuro/' | relative_url }}), defendi que uma função só gera valor quando funciona na operação real. A confirmação do pedido é um exemplo pequeno e decisivo dessa ideia.

A pergunta para avaliar um sistema de pedidos não é apenas “o pedido foi enviado?”. É também: **quando algo falha no meio, todos conseguem descobrir o que aconteceu e seguir sem cobrar ou preparar duas vezes?**

*Análise independente baseada em cenários hipotéticos de produto e testes. Não descreve uma ocorrência de um fornecedor específico.*
