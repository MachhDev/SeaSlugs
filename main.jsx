import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const slugs = [
  { hue:'red', name:'Spanish dancer', latin:'Hexabranchus sanguineus', fact:'Its broad mantle can ripple like a flamenco skirt, letting this nudibranch swim through the water.', image:'src/images/slugs-cutout/spanish-dancer.png' },
  { hue:'orange', name:'Orange gumdrop', latin:'Doriopsilla gemela', fact:'It grazes on sponges — and its cheerful orange skin is a warning that it may taste terrible to predators.', image:'src/images/slugs-cutout/orange-gumdrop.png' },
  { hue:'yellow', name:'Yellow umbrella', latin:'Tylodina perversa', fact:'Like a tiny living umbrella, it carries a shell and specializes in eating yellow sea sponges.', image:'src/images/slugs-cutout/yellow-umbrella.png' },
  { hue:'lemon', name:'Sea lemon', latin:'Archidoris pseudoargus', fact:'Its bumpy, lemon-peel body helps it vanish against the sponges it loves to eat.', image:'src/images/slugs-cutout/sea-lemon.png' },
  { hue:'green', name:'Lettuce sea slug', latin:'Elysia crispata', fact:'It borrows chloroplasts from algae and keeps them working — a solar-powered animal!', image:'src/images/slugs-cutout/lettuce-sea-slug.png' },
  { hue:'emerald', name:'Eastern emerald elysia', latin:'Elysia chlorotica', fact:'It can survive for months using photosynthesis after stealing chloroplasts from its algal food.', image:'src/images/slugs-cutout/eastern-emerald.png' },
  { hue:'mint', name:'Leaf sheep', latin:'Costasiella kuroshimae', fact:'Those leaf-like cerata house borrowed chloroplasts, helping this slug harvest sunlight.', image:'src/images/slugs-cutout/leaf-sheep.png' },
  { hue:'blue', name:'Blue dragon', latin:'Glaucus atlanticus', fact:'It eats venomous Portuguese man o’ war and stores their stinging cells for its own defense.', image:'src/images/slugs-cutout/blue-dragon.png' },
  { hue:'azure', name:"Loch's chromodoris", latin:'Chromodoris lochi', fact:'Its bright blue pattern advertises chemical defenses it gets from the sponges it eats.', image:'src/images/slugs-cutout/lochs-chromodoris.png' },
  { hue:'violetblue', name:'Blue dragon sea slug', latin:'Pteraeolidia ianthina', fact:'Its long, violet-tipped branches hold solar partners: symbiotic algae that share their energy.', image:'src/images/slugs-cutout/pteraeolidia.png' },
  { hue:'purple', name:"Bullock's hypselodoris", latin:'Hypselodoris bullockii', fact:'Its lavender mantle is both a billboard and a bluff: it signals a bad-tasting chemical defense.', image:'src/images/slugs-cutout/bullocks-hypselodoris.png' },
  { hue:'orchid', name:'Purple hypselodoris', latin:'Hypselodoris apolegma', fact:'This reef wanderer carries a feathery gill plume on its back, where a shell would be on most snails.', image:'src/images/slugs-cutout/purple-hypselodoris.png' },
  { hue:'rainbow', name:'Rainbow sea slug', latin:'Babakina anadoni', fact:'Its glassy body flashes an entire spectrum — a fitting finale for the ocean’s tiny color laboratory.', image:'src/images/slugs-cutout/rainbow-sea-slug.png' }
];

function App(){
 const [active,setActive]=useState(0);
 useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.dataset.i))}),{threshold:.57});document.querySelectorAll('.slug').forEach(x=>io.observe(x));return()=>io.disconnect()},[])
 return <main style={{'--accent': `var(--${slugs[active].hue})`}}>
  <header><span className="counter">{String(active+1).padStart(2,'0')} / {String(slugs.length).padStart(2,'0')}</span><a href="#collection" className="jump">begin the descent ↓</a></header>
  <nav className="colorline" aria-label="Jump to a sea slug">
      {slugs.map((s,i)=><button key={s.latin} onClick=
          {()=>document.getElementById('slug-'+i).scrollIntoView({behavior:'smooth'})
      }
                                className={i===active?'on':''} style={{background:`var(--${s.hue})`}} aria-label={`${String(i+1).padStart(2,'0')}: ${s.name}`} title={s.name}/>)}</nav>
  <section id="top" className="hero"><p className="eyebrow">
      A field guide to the sea’s living spectrum</p>
      <h1>Every color<br/>has a <em>slug.</em></h1>
      <p className="intro">Scroll the reef in color order.
          Each small, soft-bodied marvel is a real animal with an unbelievable trick.</p></section>
  <section id="collection">{slugs.map((s,i)=><article className="slug" id={'slug-'+i} data-i={i} key={s.latin}>
    <div className="wash"></div><figure className="photo"><img src={s.image} alt={'Photograph of '+s.name} loading={i<2?'eager':'lazy'} width="1600" height="1100"/><figcaption>real reef photograph · Wikimedia Commons</figcaption></figure>
    <div className="copy"><p className="number">{String(i+1).padStart(2,'0')} · {s.hue}</p><h2>{s.name}</h2><p className="latin">{s.latin}</p><ul><li><b>SUPERPOWER</b></li><li>{s.fact}</li></ul></div>
  </article>)}</section>
  <footer><p>Keep drifting. The ocean is full of color.</p><a href="#top">back to the surface ↑</a></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
