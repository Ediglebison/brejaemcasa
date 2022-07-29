window.addEventListener("scroll", onScroll);

onScroll();

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  // linha alvo
  const targetLine = scrollY + innerHeight / 2;

  // verificar se a seção passou da linha
  // quais dados vou precisar?

  // o topo da seção
  const sectionTop = section.offsetTop;

  // a altura da seção
  const sectionHeight = section.offsetHeight;

  //o topo da seção chegou ou passou da linha alvo
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop;

  // verificar se a base da seção está abaixo do alvo
  // dados necessários:

  // a seção termina onde?
  const sectionEndsAt = sectionTop + sectionHeight;

  // o final da seção passou da linha alvo?
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine;

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

function openMenu() {
  document.body.classList.add("menu-expanded");
}

function closeMenu() {
  document.body.classList.remove("menu-expanded");
}

//Receita

const base = "./assets/beers.json";

async function getContent() {
  try {
    const response = await fetch(base);

    const data = await response.json();

    show(data);
  } catch (error) {
    console.error(error);
  }
}

getContent();

function show(beers) {
  let output = "";

  for (let beer of beers) {
    mash_temp = beer.method.mash_temp;
    malt = beer.ingredients.malt;
    hop = beer.ingredients.hops;

    let mash = "";

    for (let i = 0; i < mash_temp.length; i++) {
      mash += `
        Mostura: ${beer.method.mash_temp[i].temp.value}ºC<br>
        Duração: ${beer.method.mash_temp[i].duration}Min<br>
        <br>
      `;
    }

    let malte = "";

    for (let j = 0; j < malt.length; j++) {
      malte += `
        <tr>
          <th>${beer.ingredients.malt[j].name}<th>
          <th>${beer.ingredients.malt[j].amount.value}<th>
        </tr>
      `;
    }

    let lup = "";

    for (let k = 0; k < hop.length; k++) {
      lup += `
      <tr>
        <th>${beer.ingredients.hops[k].name}<th>
        <th>${beer.ingredients.hops[k].amount.value}<th>
        <th>${beer.ingredients.hops[k].add}<th>
        <th>${beer.ingredients.hops[k].attribute}<th>
      </tr>
      `;
    }
    output += `
          <li><div class="wrapper">
          <div class="col-a">
              <h3>${beer.id} - ${beer.name} - ${beer.tagline} </h3><br>
              Descrição: ${beer.description}<br>
              <br>
              abv: ${beer.abv} IBU: ${beer.ibu}<br>
              OG: ${beer.target_og} FG: ${beer.target_fg}<br>
              srm: ${beer.srm}<br>
              <br>
              ${mash}
              <br>
              Fermentação: ${beer.method.fermentation.temp.value}ºC<br>
              <br>
              Adicional: ${beer.method.twist}<br>
              <br>
              Ingredientes:<br>
              Malte: 
              <table>
                <tr>
                  <th>Nome<th>
                  <th>Qtde(Kg)<th>
                </tr>
                ${malte}
              </table>
              <br>
              Lupulo: 
              
              <table>
                <tr>
                  <th>Nome<th>
                  <th>Qtde(g)<th>
                  <th>Tempo<th>
                  <th>Atributo<th>
                </tr>
                ${lup}
              </table>
              <br>
              Levedura: ${beer.ingredients.yeast}<br>
              <br>
              Harmonização: ${beer.food_pairing}<br>
              <br>
              Dica: ${beer.brewers_tips}<br>
              <br>
          </div>
          <div class="col-b">
              <img src=${beer.image_url}><br>
          </div>
      </div></li>
      `;
  }
  document.getElementById("beers").innerHTML = output;
}

/* ScrollReveal JS */
ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 700,
}).reveal(`#home, 
#home img, 
#home .stats, 
#services, 
#services header, 
#services .card,
#about,
#about header,
#about .content`);
