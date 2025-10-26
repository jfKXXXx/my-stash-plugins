"use strict";

function main() {

  if (!document.location.pathname.includes("/images")) return;

  csLib.waitForElement(".mb2.btn-group", (elt) => {
    console.log("PicsWall: btn group html found", elt);
    CreatePicsWallButton(elt);
    
  
  })


}

function CreatePicsWallButton(elt) {
  const button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid fa-images"></i>`
  button.onclick = () => {
    console.log("PicsWall button clicked");
  };
  elt.appendChild(button);
}

main();