// ============================
// 🧠 CONFIG ET VARIABLES GLOBALES
// ============================
// const URL = "http://192.168.1.196:9999/graphql";
const URL = "http://localhost:9999/graphql";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqZmt4eHgiLCJzdWIiOiJBUElLZXkiLCJpYXQiOjE3NTgwMDM3MTd9.7x9MA4yXXk3Oc1NOiJIpxog-6mXHUoZ4JLo4hsbDMcc";

// 🧱 Objet global : accessible de partout
const AppState = {
  savedFilters: null,
  filtersLoaded: false,
  loadedImages: null,
  imagesLoaded: false
}





// ============================
// 🔧 UTILITAIRES
// ============================
function createHeaders() {
  return {
    "Content-Type": "application/json",
    "ApiKey": API_KEY
  };
}

function createImgRequest(savedFilter = "") {
  if (savedFilter === "") return new Request(URL, { // default filter...
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({
      query: `
        {
          findImages(filter:{per_page:50, page:1 sort:"random"}) {
            count,
            filesize,
            megapixels,
            images {
              id,
              date,
              title,
              urls,
              paths {image}
            }
          }
        }
      `

    })
  })

  return new Request(URL, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({ //FIXME
      query: `
        query FindFromSavedFilter($FindFilter:FindFilterType, $ImageFilter:ImageFilterType) {
          findImages(filter:$FindFilter, image_filter:$ImageFilter) {
            count,
            filesize,
            megapixels,    
              ...imageData
            
            
          }
          
        }

        fragment imageData on FindImagesResultType {
          images {
            id,
            title,
            date,
            rating100
            paths {
              image
            }
            studio {
              name
            }
            tags {name}
            performers {name, disambiguation, id, birthdate}
            
          }
        }
      `,
      variables: 
      {
        FindFilter: savedFilter.find_filter,
        ImageFilter: savedFilter.object_filter
      }
      
      

    })
  })




}


const fetchImages = async (savedFilter = "") => {  //FIXME
  const req = createImgRequest(savedFilter)

  try {
    const response = await fetch(req);
    if (!response.ok) throw new Error("Network error: " + response.status);
    const json = await response.json();


    AppState.loadedImages = json.data.findImages
    console.log(`✅ ${AppState.loadedImages.count} images loaded and cached`, AppState.loadedImages);

  }
  catch (err) {
    console.error("❌ fetchImages failed:", err)
  }

}


const FetchRandomImages = async () => {
  const req = createImgRequest()

  try {
    const response = await fetch(req);
    if (!response.ok) throw new Error("Network error: " + response.status);
    const json = await response.json();


    AppState.loadedImages = json.data.findImages
    console.log(`✅ ${AppState.loadedImages.count} images loaded and cached`, AppState.loadedImages);

  }
  catch (err) {
    console.error("❌ fetchImages failed:", err)
  }

}

async function FetchSavedFilters() {
  try {
    const req = new Request(URL, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        query: `{
          findSavedFilters(mode:IMAGES) {
            id
            name
            find_filter {
              q
              per_page
              sort
            }
            object_filter
          }
        }`
      })
    });

    const response = await fetch(req);
    if (!response.ok) throw new Error("Network error: " + response.status);

    const json = await response.json();
    return json.data.findSavedFilters; // 👈 On renvoie directement la liste
  } catch (err) {
    console.error("❌ FetchSavedFilters failed:", err);
    return [];
  }
}


function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // reset

  if (!AppState?.loadedImages?.images) {
    console.error("No images loaded");
    return;
  }

  AppState.loadedImages.images.forEach(img => {
    const wrapper = document.createElement("div");
    wrapper.className = "masonry-item";
    wrapper.dataset.id = img.id;

    const imageEl = document.createElement("img");
    imageEl.src = img.paths.image;
    // imageEl.loading = "lazy"; // optimisation navigateur
    imageEl.alt = img.title || `Image ${img.id}`;

    wrapper.appendChild(imageEl);
    gallery.appendChild(wrapper);
  });
}




// ============================
// 🚀 INITIALISATION
// ============================
async function InitFilterSelector() {
  console.log("Initializing UI...");
  const selector = document.querySelector("#img-filter-select");

  // 1️⃣ On charge et stocke globalement
  const filters = await FetchSavedFilters();
  AppState.savedFilters = filters;
  AppState.filtersLoaded = true;

  // 2️⃣ On met à jour l'UI
  selector.innerHTML += filters
    .map(f => `<option value="${f.id}">${f.name}</option>`)
    .join("");

  console.log(`✅ ${filters.length} filters loaded and cached`);

  selector.addEventListener("change", (e) => {
    console.log("Select filter event: ", e);
    console.log("Selected value: ", e.target.value);

    const selectedFilter = AppState.savedFilters.find((f) => f.id === e.target.value)
    console.log("Selected Filter: ", selectedFilter);
    fetchImages(selectedFilter);  //FIXME

  }
  )

}

// Appel au démarrage
// InitFilterSelector();
// Exemple d’utilisation :
FetchRandomImages().then(() => renderGallery()); //Temp: load a random bunch of images while the filter/query system is not fixed



// ============================
// 🧩 UTILISATION SYNCHRONE PLUS TARD
// ============================

