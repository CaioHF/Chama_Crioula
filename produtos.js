// LISTA DE PRODUTOS
/*const produtos = [
  { 
    nome: "Alcatra com Picanha", 
    preco: 49.98, 
    img: "imagens/produtos/alcatra.png", 
    categoria: "bovino", 
    maisVendido: true, 
    especial: true,
    descricao: `
      Corte bovino que reúne duas carnes muito apreciadas em uma só peça: a Alcatra, conhecida pela maciez e versatilidade, e a Picanha, famosa pelo sabor marcante e pela capa de gordura que garante suculência.<br>
      A alcatra tem textura macia, pouca gordura e é fácil de preparar, enquanto a picanha acrescenta mais sabor e suculência, deixando o corte ainda mais especial.<br><br>
      
      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Sabor equilibrado, não é forte demais</li>
        <li>Pouca perda de peso no preparo</li>
        <li>Ótima para quem quer qualidade sem complicação</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 0 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Assados no forno</li>
        <li>Bifes altos ou em tiras</li>
      </ul>
    ` 
  },
  { 
    nome: "Bife de Chorizo",
    preco: 69.98,
    img: "imagens/produtos/chorizo.png",
    categoria: "bovino",
    maisVendido: true,
    descricao: `
      Corte bovino retirado do contrafilé, muito conhecido pela maciez e sabor marcante. Possui uma capa de gordura lateral, que derrete no preparo e deixa a carne mais suculenta e saborosa.<br>
      É um corte fácil de acertar, ideal tanto para quem já gosta de carne quanto para quem está começando a preparar grelhados em casa.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Sabor intenso, sem ser pesado</li>
        <li>Gordura na medida certa</li>
        <li>Preparo rápido e prático</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 0 20px;">
        <li>Churrasco</li>
        <li>Grelha ou chapa</li>
        <li>Bifes altos</li>
      </ul>
    ` 
  },
  { 
    nome: "Brisket", 
    preco: 39.95, 
    img: "imagens/produtos/brisket.png", 
    categoria: "bovino", 
    maisVendido: true,
    especial: true,
    descricao: `
      Corte bovino retirado do peito do boi, conhecido por suas fibras longas e alto teor de colágeno, o que garante uma carne extremamente saborosa quando preparada da forma correta.<br>
      É um corte mais firme, que não deve ser feito rapidamente, mas que se transforma em uma carne macia, suculenta e cheia de sabor após um cozimento lento.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso e marcante</li>
        <li>Excelente suculência após preparo lento</li>
        <li>Ideal para receitas que pedem longa cocção</li>
        <li>Muito usado em defumação</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Defumação (smoker)</li>
        <li>Assados longos</li>
        <li>Cozidos de panela</li>
        <li>Carne desfiada</li>
      </ul>
      Fica perfeito quando preparado em baixa temperatura por várias horas, permitindo que o colágeno se dissolva e a carne fique macia.
    `
  },
  { 
    nome: "Bife Ancho", 
    preco: 69.98, 
    img: "imagens/produtos/bife_ancho.png", 
    categoria: "bovino", 
    maisVendido: true,
    especial: true,
    descricao: `
      Corte bovino retirado do entrecôte (parte central do contrafilé), conhecido pela alta marmorização, que garante maciez, suculência e muito sabor.<br>
      É uma carne fácil de preparar e difícil de errar, ideal para quem busca um corte saboroso e macio, mesmo sem muita experiência na cozinha.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Alta marmorização (gordura entremeada)</li>
        <li>Carne extremamente macia</li>
        <li>Sabor intenso e suculento</li>
        <li>Ótimo rendimento no preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Bifes altos</li>
      </ul>
      Fica excelente mal passada ou ao ponto, apenas com sal, permitindo que a gordura derreta e realce o sabor natural da carne.
    `
  },
   { 
    nome: "Coxão Mole", 
    preco: 48.98, 
    img: "imagens/produtos/coxao_mole.png", 
    categoria: "bovino", 
    maisVendido: true,
    descricao: `
      Corte bovino conhecido pela maciez e fibras curtas, sendo uma das carnes mais versáteis para o dia a dia. Possui baixo teor de gordura, textura suave e sabor leve, o que facilita o preparo e agrada todos os paladares.<br>
      É uma excelente opção para quem busca uma carne fácil de usar, econômica e que funciona bem em diversas receitas.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e com pouca gordura</li>
        <li>Sabor suave</li>
        <li>Versátil e fácil de preparar</li>
        <li>Ótimo custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 0 20px;">
        <li>Bifes</li>
        <li>Carne de panela</li>
        <li>Strogonoff</li>
        <li>Carne moída</li>
        <li>Iscas e tiras</li>
      </ul>
    `
  },
  { 
    nome: "Costela Ripa", 
    preco: 34.98, 
    img: "imagens/produtos/costela_ripa.png", 
    categoria: "bovino", 
    maisVendido: true,
    descricao: `
      Corte bovino retirado da costela, composto por ossos largos e carne entremeada por gordura, responsável por um sabor intenso e marcante. É uma carne mais firme, que exige preparo adequado para atingir maciez total.<br>
      Quando bem feita, a gordura derrete lentamente, deixando a carne muito suculenta e extremamente saborosa.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor forte e tradicional</li>
        <li>Alta suculência</li>
        <li>Ideal para preparos longos</li>
        <li>Muito apreciada em churrascos</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 0 20px;">
        <li>Churrasco de fogo baixo</li>
        <li>Assados longos</li>
        <li>Panela ou forno</li>
        <li>Defumação</li>
      </ul>
    `
  },
  { 
    nome: "Costela Janelão", 
    preco: 35.98, 
    img: "imagens/produtos/costela_janela.png", 
    categoria: "bovino", 
    maisVendido: true,
    descricao: `
      Corte bovino retirado da parte mais larga da costela, conhecido pelos ossos grandes e pela grande quantidade de carne entremeada por gordura, o que garante muito sabor e suculência.<br>
      É um corte robusto, tradicional, que exige preparo lento, mas entrega uma carne extremamente macia, suculenta e cheia de sabor quando bem feito.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso e marcante</li>
        <li>Carne muito suculenta</li>
        <li>Ótimo rendimento após preparo longo</li>
        <li>Corte tradicional e muito apreciado</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco de fogo baixo</li>
        <li>Assados longos</li>
        <li>Panela ou forno</li>
        <li>Costela no bafo</li>
      </ul>
      Fica perfeita quando preparada por várias horas, em baixa temperatura, até a carne ficar macia e se soltar facilmente do osso.
    `
  },
  { 
    nome: "Fraldinha", 
    preco: 39.98, 
    img: "imagens/produtos/fraldinha.png", 
    categoria: "bovino", 
    maisVendido: true,
    descricao: `
      Corte bovino retirado da parte traseira do boi, conhecido pelo sabor marcante e pelas fibras mais longas, que garantem uma carne suculenta quando preparada corretamente.<br>
      É uma carne muito apreciada por quem gosta de sabor intenso, sendo fácil de preparar e com ótimo resultado tanto no churrasco quanto no dia a dia.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor acentuado</li>
        <li>Boa suculência</li>
        <li>Preparo simples</li>
        <li>Excelente custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Assados</li>
        <li>Carne em tiras ou iscas</li>
      </ul>
      Fica melhor quando preparada rapidamente e cortada contra as fibras, garantindo mais maciez.
    `
  },
  { 
    nome: "T-Bone", 
    preco: 48.98, 
    img: "imagens/produtos/t-bone.png", 
    categoria: "bovino", 
    maisVendido: true,
    especial: true,
    descricao: `
      Corte bovino clássico que reúne dois tipos de carne em uma única peça, separados por um osso em formato de “T”. De um lado está o filé mignon, extremamente macio, e do outro o contrafilé, com sabor mais intenso.<br>
      Essa combinação oferece maciez e sabor ao mesmo tempo, tornando o corte muito valorizado em churrascos e grelhados especiais.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Dois cortes diferentes em uma só peça</li>
        <li>Excelente maciez e suculência</li>
        <li>Sabor equilibrado</li>
        <li>Visual imponente no preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelha ou chapa</li>
        <li>Bifes altos</li>
      </ul>
      Fica excelente mal passado ou ao ponto, temperado apenas com sal, para valorizar os sabores naturais de cada lado da carne.
    `
  },
  { 
    nome: "Costela Suína", 
    preco: 29.98, 
    img: "imagens/produtos/costela_suina.png", 
    categoria: "suino", 
    maisVendido: true,
    descricao: `
      Corte suíno retirado da costela do porco, conhecido pela carne macia, sabor levemente adocicado e boa quantidade de gordura, que garante suculência no preparo.<br>
      É um corte muito versátil, fácil de agradar e que fica extremamente saboroso quando preparado corretamente.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Sabor suave e equilibrado</li>
        <li>Ótimo rendimento no preparo</li>
        <li>Muito versátil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Assados no forno</li>
        <li>Panela ou pressão</li>
        <li>Costela barbecue</li>
      </ul>
      Fica excelente quando preparada lentamente, permitindo que a gordura derreta e a carne fique macia e saborosa.
    `
  },
  { 
    nome: "Coração de Frango Jaguá Bandeja 1kg", 
    preco: 25.98, 
    img: "imagens/produtos/coracao.png", 
    categoria: "frango", 
    maisVendido: true,
    descricao: `
      Corte de frango muito apreciado no churrasco, conhecido pela textura macia, sabor marcante e excelente suculência. É uma carne uniforme, fácil de preparar e que agrada diversos paladares.<br>
      Por ser uma proteína prática e versátil, é ideal tanto para momentos especiais quanto para o dia a dia.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Sabor característico e agradável</li>
        <li>Preparo rápido</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Espetos</li>
        <li>Petiscos</li>
      </ul>
      Fica excelente quando preparado rapidamente, bem dourado por fora e suculento por dentro, temperado com sal ou marinadas leves.
    `
  },
  { 
    nome: "Meio da Asa", 
    preco: 36.98, 
    img: "imagens/produtos/meio_da_asa.png", 
    categoria: "frango", 
    maisVendido: true,
    descricao: `
      Corte de frango conhecido pela carne macia, sabor marcante e pela presença de pele, que garante suculência e crocância no preparo.<br>
      É uma opção prática, muito apreciada em reuniões e no dia a dia, além de ser fácil de temperar e preparar.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne suculenta</li>
        <li>Sabor intenso</li>
        <li>Pele que deixa o preparo mais crocante</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Assados no forno</li>
        <li>Frituras</li>
        <li>Airfryer</li>
      </ul>
      Fica excelente quando bem temperado e preparado até ficar dourado e crocante por fora, mantendo a carne macia por dentro.
    `
  },
  { 
    nome: "Assado de Tiras", 
    preco: 59.95, 
    img: "imagens/produtos/assado-tiras.png", 
    categoria: "bovino", 
    especial: true,
    descricao: `
      Corte bovino composto por tiras da costela com osso, muito tradicional no churrasco e conhecido pelo sabor intenso e pela gordura que garante suculência durante o preparo.<br>
      É uma carne mais firme, que exige atenção no tempo de fogo, mas entrega um resultado muito saboroso e suculento quando bem preparada.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Boa suculência</li>
        <li>Corte tradicional</li>
        <li>Ideal para churrasco</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na brasa</li>
        <li>Assados</li>
      </ul>
      Fica melhor quando preparado em fogo médio para baixo, virando aos poucos, permitindo que a gordura derreta e a carne fique macia e dourada.
    `
  },
  { 
    nome: "Acém", 
    preco: 29.90, 
    img: "imagens/produtos/acem.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte dianteira do boi, conhecido pelo sabor marcante e pela presença de fibras mais firmes, sendo ideal para preparos que valorizam o cozimento correto.<br>
      É uma carne muito versátil, bastante usada no dia a dia, com ótimo rendimento e excelente custo-benefício.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Muito versátil</li>
        <li>Ótimo rendimento</li>
        <li>Excelente custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Moída</li>
        <li>Hambúrguer artesanal</li>
        <li>Cozimentos longos</li>
      </ul>
      Fica melhor quando preparada em cozimentos mais longos, que deixam a carne macia e cheia de sabor.
    `
  },
   { 
    nome: "Bacon", 
    preco: 69.98, 
    img: "imagens/produtos/bacon.png", 
    categoria: "suino", 
    descricao: `
      Corte suíno retirado da barriga do porco, conhecido pela camada equilibrada de carne e gordura, responsável por um sabor intenso e aroma irresistível no preparo.<br>
      É um produto muito versátil, usado tanto como ingrediente principal quanto para realçar o sabor de outras receitas.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Gordura que traz suculência e crocância</li>
        <li>Muito versátil na cozinha</li>
        <li>Realça o sabor de outras carnes</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Grelhados</li>
        <li>Frituras</li>
        <li>Churrasco</li>
        <li>Acompanhamentos</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica excelente quando dourado lentamente, deixando a gordura derreter e o bacon ficar crocante e cheio de sabor.
    ` 
  },
  { 
    nome: "Bife de Alcatra", 
    preco: 49.98, 
    img: "imagens/produtos/bife.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da alcatra, conhecido pela maciez, sabor suave e baixo teor de gordura. É uma carne prática, fácil de preparar e muito utilizada no dia a dia.<br>
      Por ter textura macia e preparo rápido, é ideal para quem busca uma carne versátil e que agrada toda a família.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia</li>
        <li>Sabor suave</li>
        <li>Pouca gordura</li>
        <li>Preparo rápido</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Bifes na frigideira ou chapa</li>
        <li>Grelhados</li>
        <li>Assados rápidos</li>
        <li>Iscas e tiras</li>
      </ul>
      Fica melhor quando preparada rapidamente, ao ponto ou mal passada, evitando passar demais para não perder maciez.
    `
  },
  { 
    nome: "Bisteca com Mingon", 
    preco: 48.98, 
    img: "imagens/produtos/bisteca_c_file.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino que reúne a bisteca com o filé mignon, oferecendo uma combinação de sabor marcante com alta maciez. O osso presente no corte ajuda a conservar a suculência durante o preparo, deixando a carne ainda mais saborosa.<br>
      É um corte diferenciado, ideal para quem quer impressionar sem complicação, mesmo sem muita experiência na cozinha.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Combinação de maciez e sabor</li>
        <li>Presença do filé mignon, extremamente macio</li>
        <li>Osso que realça o sabor e mantém a suculência</li>
        <li>Ótimo rendimento no preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Bifes altos</li>
        <li>Assados</li>
      </ul>
      Fica excelente ao ponto ou mal passada, temperada apenas com sal, valorizando o sabor natural da carne.
    `
  },
  { 
    nome: "Bisteca", 
    preco: 38.98, 
    img: "imagens/produtos/bisteca_s_mignon.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino com osso, retirado da região do lombo, conhecido pelo sabor marcante e pela boa suculência. O osso ajuda a manter a umidade da carne durante o preparo, deixando o resultado mais saboroso.<br>
      É um corte tradicional, fácil de preparar e muito utilizado tanto no dia a dia quanto em churrascos.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Boa suculência</li>
        <li>Osso que realça o sabor</li>
        <li>Preparo simples</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Frigideira</li>
        <li>Assados</li>
      </ul>
      Fica melhor quando preparada rapidamente, ao ponto ou bem passada, temperada com sal e temperos simples.
    `
  },
  { 
    nome: "Bisteca Suína", 
    preco: 23.98, 
    img: "imagens/produtos/bisteca_suina.png", 
    categoria: "suino", 
    descricao: `
      Corte suíno com osso, retirado do lombo do porco, conhecido pela carne macia, sabor suave e boa suculência. O osso ajuda a manter a umidade durante o preparo, deixando a carne mais saborosa.<br>
      É uma opção prática, econômica e muito presente no dia a dia das famílias.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia</li>
        <li>Sabor suave</li>
        <li>Boa suculência</li>
        <li>Preparo rápido e fácil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Frigideira</li>
        <li>Grelhados</li>
        <li>Churrasco</li>
        <li>Assados no forno</li>
      </ul>
      Fica excelente quando bem dourada por fora e suculenta por dentro, temperada com alho, sal ou temperos simples.
    `
  },
  { 
    nome: "Carne moída 1º", 
    preco: 44.98, 
    img: "imagens/produtos/carne_moida1.png", 
    categoria: "bovino", 
    descricao: `
      Carne bovina moída produzida a partir de cortes nobres, com equilíbrio entre carne e gordura, garantindo sabor, maciez e ótimo rendimento no preparo.<br>
      É uma opção versátil, prática e fácil de usar, ideal para quem busca qualidade nas receitas do dia a dia.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Boa maciez</li>
        <li>Sabor equilibrado</li>
        <li>Gordura na medida certa</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Molhos</li>
        <li>Hambúrgueres</li>
        <li>Almôndegas</li>
        <li>Recheios</li>
        <li>Pratos do dia a dia</li>
      </ul>
      Fica excelente em preparos rápidos ou mais elaborados, mantendo sabor e suculência.
    `
  },
  { 
    nome: "Carne moída 2º", 
    preco: 32.98, 
    img: "imagens/produtos/carne_moida2.png", 
    categoria: "bovino", 
    descricao: `
      Carne bovina moída produzida a partir de cortes mais firmes, com menor teor de gordura, resultando em uma carne com sabor marcante e ótima textura após o preparo.<br>
      É uma opção econômica e muito versátil, ideal para receitas que pedem mais estrutura e cozimento um pouco mais prolongado.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Menor teor de gordura</li>
        <li>Ótimo custo-benefício</li>
        <li>Boa textura após o preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Molhos</li>
        <li>Recheios</li>
        <li>Carne moída refogada</li>
        <li>Ensopados</li>
        <li>Preparos do dia a dia</li>
      </ul>
      Fica melhor quando bem refogada ou cozida, garantindo sabor e boa textura no prato final.
    `
  },
  { 
    nome: "Carvão 4kg", 
    preco: 29.95, 
    img: "imagens/produtos/carvao4.png", 
    categoria: "acompanhamentos", 
    descricao: `
      Carvão vegetal selecionado, ideal para churrascos e grelhados, garantindo queima uniforme, boa formação de brasa e alta durabilidade durante o uso.<br><br>
      Proporciona calor constante, facilitando o preparo das carnes e garantindo melhor controle do fogo.
    `
  },
  { 
    nome: "Carvão 5kg", 
    preco: 36.95, 
    img: "imagens/produtos/carvao5.png", 
    categoria: "acompanhamentos", 
    descricao: `
      Carvão vegetal selecionado, ideal para churrascos e grelhados, garantindo queima uniforme, boa formação de brasa e alta durabilidade durante o uso.<br><br>
      Proporciona calor constante, facilitando o preparo das carnes e garantindo melhor controle do fogo.
    `
  },
  
  { 
    nome: "Carvão 7kg", 
    preco: 49.95, 
    img: "imagens/produtos/carvao7.png", 
    categoria: "acompanhamentos", 
    descricao: `
      Carvão vegetal selecionado, ideal para churrascos e grelhados, garantindo queima uniforme, boa formação de brasa e alta durabilidade durante o uso.<br><br>
      Proporciona calor constante, facilitando o preparo das carnes e garantindo melhor controle do fogo.
    `
  },
  { 
    nome: "Carvão 8kg", 
    preco: 54.95, 
    img: "imagens/produtos/carvao8.png", 
    categoria: "acompanhamentos", 
    descricao: `
      Carvão vegetal selecionado, ideal para churrascos e grelhados, garantindo queima uniforme, boa formação de brasa e alta durabilidade durante o uso.<br><br>
      Proporciona calor constante, facilitando o preparo das carnes e garantindo melhor controle do fogo.
    `
  },

 { 
    nome: "Steak Americano", 
    preco: 41.98, 
    img: "imagens/produtos/americano.png", 
    categoria: "bovino", 
    especial: true,
    descricao: `
      Corte bovino inspirado no estilo americano, conhecido por ser alto, suculento e muito saboroso. Geralmente retirado de partes nobres do boi (como o Acém com osso), é ideal para quem gosta de carne com presença e visual marcante no prato.<br>
      É um corte fácil de preparar e perfeito para quem quer um resultado suculento mesmo sem muita experiência.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Corte alto e imponente</li>
        <li>Boa suculência</li>
        <li>Sabor marcante</li>
        <li>Preparo simples</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Bifes altos</li>
      </ul>
      Fica excelente ao ponto ou mal passado, temperado apenas com sal, valorizando o sabor natural da carne.
    `
  },
  { 
    nome: "Prime Rib", 
    preco: 0.00, 
    img: "imagens/produtos/prime-rib.png", 
    categoria: "bovino", 
    especial: true,
    descricao: `
      Corte bovino nobre retirado da parte dianteira do contrafilé, com osso e alta marmorização, o que garante uma carne extremamente macia, suculenta e saborosa. O osso ajuda a manter a umidade durante o preparo e intensifica o sabor.<br>
      É um corte imponente, muito valorizado em churrascos e ocasiões especiais.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Alta marmorização</li>
        <li>Carne muito macia</li>
        <li>Osso que realça o sabor</li>
        <li>Visual premium no preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na brasa</li>
        <li>Bifes altos</li>
      </ul>
      Fica excelente mal passado ou ao ponto, temperado apenas com sal, deixando o sabor natural da carne em destaque.
    `
  },
  { 
    nome: "Short Rib", 
    preco: 0.00, 
    img: "imagens/produtos/short-rib.png", 
    categoria: "bovino", 
    especial: true,
    descricao: `
      Corte bovino retirado da costela dianteira, com ossos curtos e carne entremeada por gordura, conhecido pelo sabor intenso e pela alta suculência.<br>
      É um corte muito utilizado na culinária americana e asiática, perfeito para quem busca uma carne marcante e extremamente saborosa quando preparada corretamente.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor forte e marcante</li>
        <li>Alta suculência</li>
        <li>Gordura que realça o sabor</li>
        <li>Ótimo rendimento após o preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assados longos</li>
        <li>Cozimentos lentos</li>
        <li>Grelhados em fogo baixo</li>
        <li>Churrasco</li>
      </ul>
      Fica excelente quando preparado lentamente, permitindo que a carne fique macia e cheia de sabor.
    `
  },
  { 
    nome: "Costela Minga", 
    preco: 30.98, 
    img: "imagens/produtos/costela_minga.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte dianteira da costela, conhecido pela carne entremeada por gordura e pelo sabor intenso. Possui fibras mais firmes, que se transformam em uma carne extremamente macia quando preparada corretamente.<br>
      É um corte tradicional, muito apreciado por quem gosta de carnes bem saborosas e suculentas.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Boa quantidade de gordura</li>
        <li>Alta suculência após o preparo</li>
        <li>Excelente para cozimentos longos</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assados longos</li>
        <li>Churrasco de fogo baixo</li>
        <li>Panela</li>
        <li>Costela no bafo</li>
      </ul>
      Fica perfeita quando preparada lentamente, em baixa temperatura, até a carne ficar macia e soltar facilmente do osso.
    `
  },
  { 
    nome: "Coxinha da Asa", 
    preco: 22.98, 
    img: "imagens/produtos/coxinha_asa.png", 
    categoria: "frango", 
    descricao: `
      <strong>🍗 Coxinha da Asa (Drumet)</strong><br>
      Corte de frango retirado da parte mais carnuda da asa, conhecido pela carne macia, suculenta e sabor suave. Possui ótima proporção entre carne e osso, o que garante um preparo fácil e um resultado muito saboroso.<br>
      É uma opção prática e muito popular, ideal para refeições rápidas e petiscos.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Sabor suave</li>
        <li>Ótimo rendimento</li>
        <li>Preparo fácil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assados no forno</li>
        <li>Frituras</li>
        <li>Airfryer</li>
        <li>Churrasco</li>
        <li>Petiscos</li>
      </ul>
      Fica excelente quando bem temperada e preparada até ficar dourada por fora e macia por dentro.
    `
  },
  { 
    nome: "Filé Agulha", 
    preco: 31.98, 
    img: "imagens/produtos/file_agulha.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte dianteira do boi, conhecido pelo sabor intenso e pela presença de fibras mais firmes. É uma carne muito utilizada no dia a dia, com bom rendimento e excelente custo-benefício.<br>
      Quando preparada corretamente, entrega pratos saborosos e encorpados.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Ótimo rendimento</li>
        <li>Versátil</li>
        <li>Excelente custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Molhos</li>
        <li>Carne moída</li>
        <li>Cozimentos longos</li>
      </ul>
      Fica melhor quando preparada em cozimentos mais longos, que deixam a carne macia e cheia de sabor.
    `
  },
  { 
    nome: "Frango Inteiro", 
    preco: 14.98, 
    img: "imagens/produtos/frango.png", 
    categoria: "frango", 
    descricao: `
      Ave inteira, muito versátil e econômica, com carne macia, sabor suave e ótimo rendimento. Possui diferentes partes com texturas variadas, permitindo diversos tipos de preparo em uma única peça.<br>
      É uma excelente opção para refeições completas, práticas e que agradam toda a família.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Ótimo rendimento</li>
        <li>Carne macia e sabor suave</li>
        <li>Muito versátil</li>
        <li>Excelente custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assado no forno</li>
        <li>Churrasco</li>
        <li>Panela</li>
        <li>Caldo e sopas</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica excelente quando bem temperado e assado lentamente, garantindo suculência e sabor em todas as partes.
    `
  },
  { 
    nome: "Linguiça Toscana", 
    preco: 21.98, 
    img: "imagens/produtos/linguica_toscana.png", 
    categoria: "suino", 
    descricao: `
      Embutido suíno tradicional, preparado com carne selecionada, temperos suaves e gordura na medida certa, garantindo sabor marcante e ótima suculência no preparo.<br>
      É um produto muito versátil, fácil de agradar e presença garantida em churrascos e refeições do dia a dia.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor equilibrado e marcante</li>
        <li>Boa suculência</li>
        <li>Preparo simples</li>
        <li>Muito versátil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados</li>
        <li>Assados no forno</li>
        <li>Panela</li>
        <li>Acompanhamentos</li>
      </ul>
      Fica excelente quando preparada lentamente, permitindo que doure por fora e fique suculenta por dentro.
    `
  },
  { 
    nome: "Músculo com Osso", 
    preco: 28.98, 
    img: "imagens/produtos/musculo.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da perna do boi, com osso, conhecido pelo sabor intenso e pela grande quantidade de colágeno, que deixa os caldos encorpados e a carne macia após o preparo correto.<br>
      É uma carne ideal para quem busca pratos bem saborosos e nutritivos, especialmente em cozimentos longos.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Rico em colágeno</li>
        <li>Excelente para caldos e ensopados</li>
        <li>Ótimo rendimento após cozimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Caldo e sopas</li>
        <li>Cozimentos longos</li>
      </ul>
      Fica perfeito quando preparado lentamente, permitindo que a carne fique macia e o caldo bem encorpado.
    `
  },
  { 
    nome: "Paleta 7", 
    preco: 39.98, 
    img: "imagens/produtos/paleta7.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte dianteira do boi, conhecido pelo sabor intenso e pela presença de osso, que ajuda a deixar a carne mais suculenta durante o preparo.<br>
      É uma carne tradicional, muito utilizada em receitas caseiras, com ótimo rendimento e excelente resultado em cozimentos prolongados.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante</li>
        <li>Osso que realça o sabor</li>
        <li>Ótimo rendimento</li>
        <li>Ideal para cozimentos longos</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Cozidos</li>
        <li>Assados longos</li>
      </ul>
      Fica melhor quando preparada lentamente, até a carne ficar macia e soltar facilmente do osso.
    `
  },
  { 
    nome: "Paleta Simples", 
    preco: 33.95, 
    img: "imagens/produtos/paleta0.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte dianteira do boi, conhecido pelo sabor marcante e pelas fibras mais firmes, sendo ideal para receitas que pedem cozimento adequado.<br>
      É uma carne muito utilizada no dia a dia, com ótimo rendimento e excelente custo-benefício.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Ótimo rendimento</li>
        <li>Versátil</li>
        <li>Excelente custo-benefício</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Carne desfiada</li>
        <li>Cozimentos longos</li>
      </ul>
      Fica melhor quando preparada lentamente, permitindo que a carne fique macia e cheia de sabor.
    `
  },
  { 
    nome: "Paleta Suíno", 
    preco: 23.98, 
    img: "imagens/produtos/paleta_suina.png", 
    categoria: "suino", 
    descricao: `
      Corte suíno retirado da parte dianteira do porco, conhecido pela carne macia, sabor suave e boa quantidade de gordura, que garante suculência no preparo.<br>
      É uma carne versátil, muito utilizada em receitas caseiras e que entrega ótimo resultado em diferentes tipos de preparo.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia</li>
        <li>Boa suculência</li>
        <li>Sabor suave</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assados no forno</li>
        <li>Panela</li>
        <li>Carne desfiada</li>
        <li>Cozimentos longos</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica excelente quando preparada lentamente, permitindo que a carne fique macia e saborosa.
    `
  },
  { 
    nome: "Panceta Suína", 
    preco: 23.98, 
    img: "imagens/produtos/panceta.png", 
    categoria: "suino", 
    descricao: `
      Corte suíno retirado da barriga do porco, conhecido pela camada generosa de carne e gordura, responsável por uma carne extremamente saborosa e suculenta.<br>
      É um corte muito apreciado por quem gosta de carnes mais intensas, com textura macia por dentro e crocante por fora quando bem preparado.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Alta suculência</li>
        <li>Gordura que realça o sabor</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Assados no forno</li>
        <li>Pururuca</li>
        <li>Grelhados</li>
        <li>Receitas especiais</li>
      </ul>
      Fica excelente quando preparada lentamente e finalizada em fogo alto, garantindo carne macia por dentro e crocante por fora.
    `
  },
  { 
    nome: "Pão de Alho", 
    preco: 12.98, 
    img: "imagens/produtos/pao.png", 
    categoria: "acompanhamentos", 
    descricao: `
      Produto tradicional de churrasco, feito com pão macio recheado com creme de alho, que garante sabor marcante, textura crocante por fora e macia por dentro após o preparo.<br>
      É um acompanhamento prático e muito apreciado, perfeito para complementar carnes e refeições.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor marcante de alho</li>
        <li>Textura crocante por fora e macia por dentro</li>
        <li>Preparo rápido</li>
        <li>Acompanhamento ideal para churrasco</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelha ou churrasqueira</li>
        <li>Forno</li>
        <li>Airfryer</li>
      </ul>
      Fica excelente quando aquecido até dourar, deixando o recheio cremoso e o pão crocante.
    `
  },
  { 
    nome: "Patinho", 
    preco: 46.98, 
    img: "imagens/produtos/patinho.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da parte traseira do boi, conhecido pela carne magra, sabor suave e textura macia quando bem preparada. Possui baixo teor de gordura, sendo uma opção mais leve para o dia a dia.<br>
      É muito utilizado em receitas práticas e saudáveis, com ótimo rendimento.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne magra</li>
        <li>Sabor suave</li>
        <li>Boa maciez</li>
        <li>Versátil no preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Bifes</li>
        <li>Carne moída</li>
        <li>Iscas e tiras</li>
        <li>Ensopados leves</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica melhor quando preparada rapidamente ou em cozimentos curtos, evitando ressecar.
    `
  },
  { 
    nome: "Pernil Suíno", 
    preco: 23.98, 
    img: "imagens/produtos/pernil.png", 
    categoria: "suino", 
    descricao: `
      Corte suíno retirado da perna do porco, conhecido pela carne macia, sabor suave e ótimo rendimento. Possui boa quantidade de carne, sendo ideal para preparos maiores e refeições em família.<br>
      É um corte muito versátil, que aceita bem temperos e diferentes formas de preparo.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia</li>
        <li>Ótimo rendimento</li>
        <li>Sabor suave</li>
        <li>Muito versátil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Assados no forno</li>
        <li>Churrasco</li>
        <li>Panela</li>
        <li>Carne desfiada</li>
        <li>Receitas especiais</li>
      </ul>
      Fica excelente quando preparado lentamente, permitindo que a carne fique macia e suculenta.
    `
  },
  { 
    nome: "Picanha", 
    preco: 0.00, 
    img: "imagens/produtos/picanha.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino nobre retirado da parte superior da alcatra, conhecido pela capa de gordura característica, responsável por um sabor intenso e suculência incomparável no preparo.<br>
      É um dos cortes mais apreciados no churrasco, fácil de preparar e com resultado sempre marcante.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne macia e suculenta</li>
        <li>Capa de gordura que realça o sabor</li>
        <li>Sabor intenso</li>
        <li>Ótimo rendimento</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Churrasco</li>
        <li>Grelhados na chapa</li>
        <li>Bifes altos</li>
        <li>Assados</li>
      </ul>
      Fica excelente mal passada ou ao ponto, temperada apenas com sal grosso, valorizando o sabor natural da carne.
    `
  },
  { 
    nome: "Ponta de Peito", 
    preco: 30.98, 
    img: "imagens/produtos/ponta_de_peito.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado do peito do boi, conhecido pelas fibras mais longas, sabor marcante e pela presença de gordura e colágeno, que garantem suculência após o preparo correto.<br>
      É uma carne mais firme, ideal para quem aprecia pratos bem saborosos e encorpados.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Sabor intenso</li>
        <li>Rico em colágeno</li>
        <li>Ótima suculência após cozimento</li>
        <li>Excelente para preparos longos</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Assados longos</li>
        <li>Cozimentos lentos</li>
        <li>Carne desfiada</li>
      </ul>
      Fica perfeita quando preparada lentamente, permitindo que a carne fique macia e cheia de sabor.
    `
  },
  { 
    nome: "Posta Vermelha", 
    preco: 36.95, 
    img: "imagens/produtos/posta_vermelha.png", 
    categoria: "bovino", 
    descricao: `
      Corte bovino retirado da perna do boi, conhecido pela carne magra, fibras firmes e sabor marcante. Possui baixo teor de gordura, sendo ideal para quem busca uma opção mais leve.<br>
      É uma carne muito utilizada em preparos tradicionais, com ótimo rendimento e excelente resultado quando bem cozida.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne magra</li>
        <li>Sabor intenso</li>
        <li>Ótimo rendimento</li>
        <li>Boa textura após o preparo</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Cozidos</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica melhor quando preparada em cozimentos mais longos, garantindo maciez e sabor.
    `
  },
  { 
    nome: "Traseiro", 
    preco: 39.98, 
    img: "imagens/produtos/traseiro.png", 
    categoria: "bovino", 
    descricao: `
      Conjunto de cortes bovinos retirados da parte traseira do boi, conhecido por carnes mais macias, com menor quantidade de gordura e ótimo rendimento.<br>
      É muito utilizado no dia a dia por sua versatilidade, permitindo diversos tipos de preparo e receitas.<br><br>

      <strong>⭐ Pontos fortes</strong>
      <ul style="margin: 5px 0 10px 20px;">
        <li>Carnes mais macias</li>
        <li>Menor teor de gordura</li>
        <li>Ótimo rendimento</li>
        <li>Muito versátil</li>
      </ul>

      <strong>🍽️ Recomendações de uso</strong><br>
      Ideal para:
      <ul style="margin: 5px 0 10px 20px;">
        <li>Bifes</li>
        <li>Carne de panela</li>
        <li>Ensopados</li>
        <li>Carne moída</li>
        <li>Receitas do dia a dia</li>
      </ul>
      Fica excelente em preparos rápidos ou cozimentos controlados, dependendo do corte utilizado.
    `
  },
];

*/
