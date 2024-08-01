import { decorateButtons, decorateIcons, getMetadata } from "../../scripts/aem.js";

/**
 * decorates the aside, mainly the left navigation
 * @param {Element} block The aside block element
 */

function loadDropdowns(){
  const paragraphs = document.querySelectorAll('.left-navigation p');
    paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function() {
      const dropdown = this.nextElementSibling;
      // Toggle the 'hidden' class to show/hide the dropdown
      if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        paragraph.querySelector('img').src = "/icons/caret-down.svg";
      } else {
        dropdown.style.display = 'none';
        paragraph.querySelector('img').src = "/icons/caret-right.svg";
      }
    });
  });
}

function loadActiveLinks(){
  var path = window.location.pathname;
  // Find the matching link and add the 'active' class
  var links = document.querySelectorAll("a[href='" + path + "']");
  links.forEach(function (link) {
    link.classList.add("active");
  });

  // Find the parent container of the active link and show its dropdown
  var activeContainer = document.querySelector(".active")?.closest(".nav-heading");
  if (activeContainer) {
    const activeParagraph = activeContainer.querySelector(".left-navigation p");
    activeParagraph.querySelector('img').src = "/icons/caret-down.svg";
    var activeUl = activeContainer.querySelector("ul");
    if (activeUl) {
      activeUl.style.display = "block";
    }
  }
}

export default async function decorate(block) {
  // fetch aside content
  const leftNavMeta = getMetadata('left-nav');
  const leftNavPath = leftNavMeta ? new URL(leftNavMeta).pathname : '/left-nav';
  const resp = await fetch(`${leftNavPath}.plain.html`);
  if (resp.ok) {
      const html = await resp.text();
      block.innerHTML = html;
  }
  decorateIcons(block);
  decorateButtons(block);
  loadDropdowns();
  loadActiveLinks();
  const leftNavigationWrapper = document.querySelector('.left-navigation-wrapper');
}