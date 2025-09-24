const url = "/custom/root/"; // Replace with your target URL

//document.addEventListener("click", checkCustomURL); //enhance...

window.csLib.PathElementListener('/', '.navbar-nav', checkCustomURL);

function checkCustomURL() {

    const linkExists = document.getElementById("custom-folders-link");
    if (linkExists) {
        console.log("Link already exists. Exiting function.");
        return; // Exit if the link already exists
    }
    console.log(`links do not exist. Checking URL: ${url}`);
    //test if the URL is reachable
    fetch(url, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                console.log(`URL ${url} is reachable.`);
                addFolderLinks(); // Call the function to add folder links
            } else {
                console.log(`URL ${url} responded with status: ${response.status}`);
                throw new Error(`Status: ${response.status}`); // Trigger catch block
            }
        })
        .catch(error => {
            console.log(`Error reaching URL ${url}:`, error);
            return; // Exit the function if the URL is not reachable
        });
}


function addFolderLinks() {
    console.log("Adding folder links...");
    let navbar = document.querySelector(".navbar-nav");
    

    if (!navbar) {
        console.log("Navbar not found. Exiting function.");
        return; // Exit if navbar is not found
    }
   let mydiv = document.createElement("div");
    mydiv.id = "custom-folders-link";
    mydiv.className = "col-4 col-sm-3 col-md-2 col-lg-auto nav-link";
    mydiv.innerHTML = `<a href="${url}" class= "minimal p-4 p-xl-2 d-flex d-xl-inline-block flex-column justify-content-between align-items-center btn btn-primary">Custom Folders</a>`;
    navbar.appendChild(mydiv);
    console.log("Folder links added.");
    
}

// checkCustomURL(); //bug : wait for dom ready 


//TODO: check& get for custom_served_folder field values in stash config.yml to customise links 