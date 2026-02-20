function calculateNutrients() {
    const volume = document.getElementById('jarVolume').value;
    const dosePerLiter = document.getElementById('nutrientDose').value;
    
    if (volume && dosePerLiter) {
        const requiredDose = (volume / 1000) * dosePerLiter;
        document.getElementById('calcResult').innerText = `You need: ${requiredDose.toFixed(2)} mL`;
    } else {
        alert("Please enter both volume and dose.");
    }
}

let jars = JSON.parse(localStorage.getItem('momJars')) || [];

function saveJars() {
    localStorage.setItem('momJars', JSON.stringify(jars));
    renderJars();
}

function renderJars() {
    const container = document.getElementById('jarContainer');
    container.innerHTML = '';

    jars.forEach((jar, index) => {
        const card = document.createElement('div');
        card.className = 'jar-card';
        
        card.innerHTML = `
            <h3>${jar.name}</h3>
            <p><strong>Added:</strong> ${jar.dateAdded}</p>
            <p><strong>Last Watered:</strong> ${jar.lastWatered || 'Never'}</p>
            <p><strong>Last Nutrients:</strong> ${jar.lastNutrients || 'Never'}</p>
            <div class="btn-group">
                <button onclick="updateDate(${index}, 'lastWatered')">💧 Water</button>
                <button onclick="updateDate(${index}, 'lastNutrients')">🧪 Nutrients</button>
            </div>
            <button class="btn-delete" onclick="deleteJar(${index})">Remove Jar</button>
        `;
        
        container.appendChild(card);
    });
}

document.getElementById('addJarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('jarName');
    const today = new Date().toLocaleDateString();

    const newJar = {
        name: nameInput.value,
        dateAdded: today,
        lastWatered: null,
        lastNutrients: null
    };

    jars.push(newJar);
    saveJars();
    nameInput.value = '';
});

function updateDate(index, actionType) {
    const today = new Date().toLocaleDateString();
    jars[index][actionType] = today;
    saveJars();
}

function deleteJar(index) {
    if(confirm("Are you sure you want to remove this jar?")) {
        jars.splice(index, 1);
        saveJars();
    }
}

renderJars();