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
            <img src="${costume.costumeIMGBase64}" alt="Costume Image" style="width:280px; border: 1px solid; border-radius: 15px">
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

        costumeCard.style.width = "285px";
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

function filterCostumes() {
    // Get search query
    const searchInput = document.getElementById("searchBar").value.toLowerCase();

    // Get checkbox values
    let maleCheck = document.getElementById("maleCheckBox").checked;
    let femaleCheck = document.getElementById("femaleCheckBox").checked;
    
    let clothCheck = document.getElementById("clothCheckBox").checked;
    let armorCheck = document.getElementById("armorCheckBox").checked;
    let nationalCheck = document.getElementById("nationalCheckBox").checked;

    let kidsSize = document.getElementById("kidsCheckBox").checked;
    let smallSize = document.getElementById("smallCheckBox").checked;
    let mediumSize = document.getElementById("mediumCheckBox").checked;
    let largeSize = document.getElementById("largeCheckBox").checked;

    let availableCheck = document.getElementById("availableCheckBox").checked;
    let unavailableCheck = document.getElementById("unavailableCheckBox").checked;

    let selectedSizes = [];
    if (kidsSize) selectedSizes.push("KIDS");
    if (smallSize) selectedSizes.push("SMALL");
    if (mediumSize) selectedSizes.push("MEDIUM");
    if (largeSize) selectedSizes.push("LARGE");

    let filteredCostumes = allCostumes.filter(costume => {
        if (maleCheck && costume.costumeGender !== "Male") return false;
        if (femaleCheck && costume.costumeGender !== "Female") return false;

        if (clothCheck && costume.costumeType !== "Cloth") return false;
        if (armorCheck && costume.costumeType !== "Armor") return false;
        if (nationalCheck && costume.costumeType !== "National Costume") return false;

        // if (
        //     (kidsSize && !costume.costumeSize.includes("Kids")) &&
        //     (smallSize && !costume.costumeSize.includes("Small")) &&
        //     (mediumSize && !costume.costumeSize.includes("Medium")) &&
        //     (largeSize && !costume.costumeSize.includes("Large"))
        // ) return false;

        if (selectedSizes.length > 0) {
            let sizeMatch = selectedSizes.some(size => costume.costumeSize.includes(size) || costume.costumeSize.includes('SIZES'));
            if (!sizeMatch) return false;
        }

        if (availableCheck && !costume.costumeAvailable) return false;
        if (unavailableCheck && costume.costumeAvailable) return false;

        if (
            searchInput &&
            !costume.costumeName.toLowerCase().includes(searchInput) &&
            !costume.costumeOrigin.toLowerCase().includes(searchInput)
        ) return false;

        return true;
    });

    displayCostumes(filteredCostumes);
}


// filter // costumes bar 1400x80.81
const filterBar = document.getElementById('filterBar');
const filterArrow = document.getElementById('filterArrow');
const filterCheckBoxes = document.getElementById('filterCheckBoxes');

filterBar.onclick = function() {
    filterCheckBoxes.classList.toggle("expanded");
    filterArrow.style.transform = filterCheckBoxes.classList.contains("expanded") ? "rotate(90deg)" : "rotate(0deg)";
    filterCheckBoxes.style.opacity = filterCheckBoxes.classList.contains("expanded") ? "1" : "0";
    filterCheckBoxes.style.maxHeight = filterCheckBoxes.classList.contains("expanded") ? "300px" : "0px";
};

document.querySelectorAll("#filterCheckBoxes input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", filterCostumes);
});
document.getElementById("searchBar").addEventListener("input", filterCostumes);
fetchCostumes();