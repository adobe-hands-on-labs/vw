import { sampleRUM } from "../../scripts/aem.js";

function decorateVideoBlock($block, videoURL) {
  if (videoURL.endsWith('.mp4')) {
    let attrs = '';
    attrs = 'playsinline controls';
    if ($block.classList.contains('autoplay')) attrs = 'playsinline controls muted autoplay loop';
    $block.innerHTML = /* html */`
      <div class="vid-wrapper">
        <video ${attrs} name="media"><source src="${videoURL}" type="video/mp4"></video>
      </div>
      `;
    $block.querySelector('video').addEventListener('play', (e) => {
      sampleRUM('play', {
        source: e.target.currentSrc,
      });
    });
  }else{
    $block.innerHTML = /* html */`
    <div class = "vid-wrapper">
      <iframe width="80%" height="500" src="${videoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>`;
  }
}

export default function decorate($block) {
  const $a = $block.querySelector('a');
  const videoURL = $a.href;
  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        decorateVideoBlock($block, videoURL);
      }
    });
  });
  observer.observe($block);
}