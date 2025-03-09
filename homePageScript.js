async function fetchCostumes() {
    const costumeContainer = document.getElementById("costumeList");
    const costumeContainer2 = document.getElementById("costumeList2");
    const costumeContainer3 = document.getElementById("costumeList3");
    costumeContainer.innerHTML = "<p>Loading costumes...</p>"; 
    costumeContainer2.innerHTML = ""; //
    costumeContainer3.innerHTML = ""; //

    try {
        const response = await fetch("https://localhost:7127/api/Costume");

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Unable to fetch costumes.`); // 404 / 505
        }

        const costumes = await response.json();

        if (!costumes || costumes.length === 0) {
            throw new Error("No costumes available at the moment.");
        }

        console.log(costumes);
        costumeContainer.innerHTML = ""; 

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(costumes);
        const randomCostumes = costumes.slice(0, 5);
        randomCostumes.forEach(costume => {
            const costumeCard = createCostumeCard(costume);
            costumeContainer.appendChild(costumeCard);
        });

        const genshinCostumes = costumes.filter(costume => costume.costumeOrigin === "Genshin Impact");
        shuffleArray(genshinCostumes); 

        genshinCostumes.forEach(costume => {
            const costumeCard = createCostumeCard(costume);
            costumeContainer2.appendChild(costumeCard);
        });
        
        const kidsCostumes = costumes.filter(costume => costume.costumeSize === "KIDS");
        shuffleArray(kidsCostumes); 

        kidsCostumes.forEach(costume => {
            const costumeCard = createCostumeCard(costume);
            costumeContainer3.appendChild(costumeCard);
        });

    } catch (error) {
        console.error("Fetch Error:", error);
        costumeContainer.innerHTML = `<p style="color: red; font-size: 1.2em;">Costumes are unavailable for viewing. Error: ${error.message}</p>`;
    }
}

// Function to create a costume card
function createCostumeCard(costume) {
    const costumeCard = document.createElement("div");
    costumeCard.classList.add("costume-card");

    costumeCard.innerHTML = `
        <img src="${costume.costumeIMGBase64}" alt="Costume Image" style="width:245px; border: 1px solid; border-radius: 15px">
        <h2>${costume.costumeName}</h2>
        <h3><b>Origin</b>: ${costume.costumeOrigin}</h3>
        <p><b>Price</b>: ₱${costume.costumePrice}</p>
        <p><b>Size</b>: ${costume.costumeSize}</p>
        <p><b>Type</b>: ${costume.costumeType}</p>
        <p><b>Gender</b>: ${costume.costumeGender}</p>
        <p><b>Inclusions</b>: ${costume.costumeInclusions}</p>
        <h3 style="color: ${costume.costumeAvailable ? 'green' : 'red'};">
            ${costume.costumeAvailable ? "Available" : "Not available"}
        </h3>
    `;

    costumeCard.style.width = "260px";
    costumeCard.style.height = "525px";
    costumeCard.style.fontSize = "0.75em";
    costumeCard.style.marginLeft = "1px";
    costumeCard.style.marginRight = "1px";
    costumeCard.style.marginBottom = "15px";

    return costumeCard;
}

fetchCostumes();

document.getElementById('viewCostumesButton').onclick = function() {
    window.location.href = "costumes.html"
}