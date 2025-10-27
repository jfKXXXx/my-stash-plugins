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
    
  })
}

function OnPicwallClick(e) {
  console.log("PicsWall button clicked");
  e.preventDefault();
  e.target.value = "active";
  e.target.classList.toggle("active");
  wallActive = e.target.value === "active";
  console.log("PicsWall button is now", wallActive ? "active" : "inactive");
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