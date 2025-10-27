"use strict";

function main() {

  if (!document.location.pathname.includes("/images")) return;

  csLib.waitForElement(".filtered-list-toolbar.btn-toolbar", (elt) => {
    console.log("PicsWall: images toolbarr html found", elt);
    CreatePicsWallButton(elt);
    
  
  })


}

function CreatePicsWallButton(elt) {
  console.log("PicsWall: creating button on :", elt);
  const button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid fa-images"></i>`
  button.onclick = () => {
    console.log("PicsWall button clicked");
  };
  elt.appendChild(button);
}

main();