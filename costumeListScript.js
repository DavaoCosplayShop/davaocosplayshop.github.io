// "https://localhost:7127/api/Costume"
let allCostumes = []; // fetched costumes 

async function fetchCostumes() {
    const costumeContainer = document.getElementById("costumeList");
    costumeContainer.innerHTML = "<p>Loading costumes...</p>"; 

    try {
        const response = await fetch("https://localhost:7127/api/Costume");

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Unable to fetch costumes.`); //404 / 505
        }

        allCostumes = await response.json();

        if (!allCostumes || allCostumes.length === 0) {
            throw new Error("No costumes available at the moment.");
        }

        console.log(allCostumes);
        displayCostumes(allCostumes);

    } catch (error) {
        console.error("Fetch Error:", error);
        costumeContainer.innerHTML = `<p style="color: red; font-size: 1.2em;">${error.message}</p>`;
    }
}

function displayCostumes(costumes) {
    const costumeContainer = document.getElementById("costumeList");
    costumeContainer.innerHTML = ""; 

    if (costumes.length === 0) {
        costumeContainer.innerHTML = `<p style="color: red; font-size: 1.2em;">No matching costumes found.</p>`;
        return;
    }

    costumes.forEach(costume => {
        const costumeCard = document.createElement("div");
        costumeCard.classList.add("costume-card");

        costumeCard.innerHTML = `
            <img src="${costume.costumeIMGBase64}" alt="Costume Image" style="width:290px; border: 1px solid; border-radius: 15px">
            <h2>${costume.costumeName}</h2>
            <h3><b>Origin</b>: ${costume.costumeOrigin}</h3>
            <p><b>Price</b>: ₱${costume.costumePrice}</p>
            <p><b>Size</b>: ${costume.costumeSize}</p>
            <p><b>Type</b>: ${costume.costumeType}</p>
            <p><b>Gender</b>: ${costume.costumeGender}</p>
            <p id="inclusions"><b>Inclusions</b>: ${costume.costumeInclusions}</p>
            <h3 style="color: ${costume.costumeAvailable ? 'green' : 'red'};">
                ${costume.costumeAvailable ? "Available" : "Not available"}
            </h3>
        `;

        costumeCard.style.width = "300px";
        costumeCard.style.height = "550px";
        costumeCard.style.fontSize = "0.75em";
        costumeCard.style.marginLeft = "1px";
        costumeCard.style.marginRight = "1px";
        costumeCard.style.marginBottom = "15px";

        costumeContainer.appendChild(costumeCard);
    });
}

function searchCostumes() { // search by name or origin
    const searchInput = document.getElementById("searchBar").value.toLowerCase();

    const filteredCostumes = allCostumes.filter(costume =>
        costume.costumeName.toLowerCase().includes(searchInput) ||
        costume.costumeOrigin.toLowerCase().includes(searchInput)
    );

    displayCostumes(filteredCostumes);
}

document.getElementById("searchBar").addEventListener("input", searchCostumes);
fetchCostumes();
