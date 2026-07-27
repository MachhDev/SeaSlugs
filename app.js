const slugs = [
  ['red', 'Spanish dancer', 'Hexabranchus sanguineus', 'Its broad mantle can ripple like a flamenco skirt, letting this nudibranch swim through the water.', 'spanish-dancer.png'],
  ['orange', 'Orange gumdrop', 'Doriopsilla gemela', 'It grazes on sponges — and its cheerful orange skin warns predators that it may taste terrible.', 'orange-gumdrop.png'],
  ['yellow', 'Yellow umbrella', 'Tylodina perversa', 'Like a tiny living umbrella, it carries a shell and specializes in eating yellow sea sponges.', 'yellow-umbrella.png'],
  ['lemon', 'Sea lemon', 'Archidoris pseudoargus', 'Its bumpy, lemon-peel body helps it vanish against the sponges it loves to eat.', 'sea-lemon.png'],
  ['green', 'Lettuce sea slug', 'Elysia crispata', 'It borrows chloroplasts from algae and keeps them working — a solar-powered animal!', 'lettuce-sea-slug.png'],
  ['emerald', 'Eastern emerald elysia', 'Elysia chlorotica', 'It can survive for months using photosynthesis after stealing chloroplasts from its algal food.', 'eastern-emerald.png'],
  ['mint', 'Leaf sheep', 'Costasiella kuroshimae', 'Its leaf-like cerata house borrowed chloroplasts, helping this slug harvest sunlight.', 'leaf-sheep.png'],
  ['blue', 'Blue dragon', 'Glaucus atlanticus', 'It eats venomous Portuguese man o’ war and stores their stinging cells for its own defense.', 'blue-dragon.png'],
  ['azure', "Loch's chromodoris", 'Chromodoris lochi', 'Its bright blue pattern advertises chemical defenses it gets from the sponges it eats.', 'lochs-chromodoris.png'],
  ['violetblue', 'Blue dragon sea slug', 'Pteraeolidia ianthina', 'Its long, violet-tipped branches hold solar partners: symbiotic algae that share their energy.', 'pteraeolidia.png'],
  ['purple', "Bullock's hypselodoris", 'Hypselodoris bullockii', 'Its lavender mantle is both a billboard and a bluff: it signals a bad-tasting chemical defense.', 'bullocks-hypselodoris.png'],
  ['orchid', 'Purple hypselodoris', 'Hypselodoris apolegma', 'This reef wanderer carries a feathery gill plume on its back, where a shell would be on most snails.', 'purple-hypselodoris.png'],
  ['rainbow', 'Rainbow sea slug', 'Babakina anadoni', 'Its glassy body flashes an entire spectrum — a fitting finale for the ocean’s tiny color laboratory.', 'rainbow-sea-slug.png']
];

const root = document.querySelector('#root');
root.innerHTML = `
  <main style="--accent: var(--red)">
    <header><span class="counter">01 / ${String(slugs.length).padStart(2, '0')}</span><a href="#collection" class="jump">begin the descent ↓</a></header>
    <nav class="colorline" aria-label="Jump to a sea slug"></nav>
    <section id="top" class="hero"><p class="eyebrow">A field guide to the sea’s living spectrum</p><h1>Every color<br>has a <em>slug.</em></h1><p class="intro">Scroll the reef in color order. Each small, soft-bodied marvel is a real animal with an unbelievable trick.</p></section>
    <section id="collection"></section>
    <footer><p>Keep drifting. The ocean is full of color.</p><a href="#top">back to the surface ↑</a></footer>
  </main>`;

const main = root.querySelector('main');
const collection = root.querySelector('#collection');
const colorline = root.querySelector('.colorline');

slugs.forEach(([hue, name, latin, fact, image], index) => {
  const id = `slug-${index}`;
  const button = document.createElement('button');
  button.type = 'button';
  button.style.background = `var(--${hue})`;
  button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')}: ${name}`);
  button.title = name;
  button.addEventListener('click', () => document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' }));
  colorline.append(button);

  const article = document.createElement('article');
  article.className = 'slug';
  article.id = id;
  article.dataset.index = index;
  article.innerHTML = `<div class="wash"></div><figure class="photo"><img src="src/images/slugs-cutout/${image}" alt="Photograph of ${name}" loading="${index < 2 ? 'eager' : 'lazy'}" width="1600" height="1100"><figcaption>real reef photograph · Wikimedia Commons</figcaption></figure><div class="copy"><p class="number">${String(index + 1).padStart(2, '0')} · ${hue}</p><h2>${name}</h2><p class="latin">${latin}</p><ul><li><b>SUPERPOWER</b></li><li>${fact}</li></ul></div>`;
  collection.append(article);
});

const buttons = [...colorline.querySelectorAll('button')];
const setActive = (index) => {
  main.style.setProperty('--accent', `var(--${slugs[index][0]})`);
  root.querySelector('.counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(slugs.length).padStart(2, '0')}`;
  buttons.forEach((button, buttonIndex) => button.classList.toggle('on', buttonIndex === index));
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.index)); });
}, { threshold: 0.57 });
root.querySelectorAll('.slug').forEach((slug) => observer.observe(slug));
setActive(0);
