"use strict";
let wallActive = false;
let picsWall = document.createElement("div");
picsWall.className = "picswall";

function main() {

  

  if (!document.location.pathname.includes("/images")) return;

  csLib.waitForElement(".filtered-list-toolbar.btn-toolbar", (elt) => {
    console.log("PicsWall: images toolbarr html found", elt);
    const wallbtn= CreatePicsWallButton(elt);
    wallbtn.addEventListener('click', OnPicwallClick);
    BuildPicsWall();
  })
}

function BuildPicsWall() {

  stash.images.forEach(img  => {
    const imgElement = document.createElement("img");
    imgElement.src = img.paths.image;
    imgElement.alt = img.id
    imgElement.className = "wall-item";
    picsWall.appendChild(imgElement);
  });

}

function OnPicwallClick(e) {
  console.log("PicsWall button clicked");
  e.preventDefault();
  wallActive = !wallActive;
  e.target.value = wallActive;;
  e.target.classList.toggle("active");
  let gallery= document.querySelector(".gallery, .row.justify-content-center")
  if (wallActive) {
    gallery.appendChild(picsWall);
  } else {
    gallery.removeChild(picsWall);
  }
  console.log("PicsWall button is now", wallActive );
}

function CreatePicsWallButton(elt) {
  console.log("PicsWall: creating button on :", elt);
  const button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid fa-images"></i>`
  button.className = "btn-active btn-secondary picswall-btn"
  
  elt.appendChild(button);
  return button;
}

main();