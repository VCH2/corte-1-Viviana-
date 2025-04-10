document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const groupCountInput = document.getElementById('group-count');
    const generateBtn = document.getElementById('generate-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const resultsContainer = document.getElementById('results-container');
    
    let people = [];

    // Cargar archivo (CSV o Excel)
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
                const text = await file.text();
                people = parseCSV(text);
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                const data = await readExcel(file);
                people = parseExcel(data);
            }
            alert(`Lista cargada: ${people.length} personas (${people.filter(p => p.gender === 'female').length} mujeres)`);
        } catch (error) {
            alert('Error al leer el archivo. Formato no válido.');
            console.error(error);
        }
    });

    // Generar grupos
    generateBtn.addEventListener('click', () => {
        if (people.length === 0) {
            alert('Primero carga un archivo con la lista de personas.');
            return;
        }
        const groupCount = parseInt(groupCountInput.value);
        if (groupCount < 2 || groupCount > people.length) {
            alert(`Número de grupos inválido. Debe estar entre 2 y ${people.length}.`);
            return;
        }
        const groups = generateBalancedGroups(people, groupCount);
        displayGroups(groups);
    });

    // Reiniciar
    reloadBtn.addEventListener('click', () => {
        people = [];
        resultsContainer.innerHTML = '';
        fileInput.value = '';
    });

    // Funciones auxiliares
    function parseCSV(text) {
        return text.split(/\r?\n/)
            .filter(line => line.trim())
            .map(line => {
                const [name, gender] = line.split(',').map(s => s.trim());
                return {
                    name,
                    gender: gender?.toLowerCase().includes('mujer') ? 'female' : 'male'
                };
            });
    }

    async function readExcel(file) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    }

    function parseExcel(data) {
        return data.map(row => ({
            name: row['Nombre'] || row['name'],
            gender: (row['Género'] || row['gender'])?.toLowerCase().includes('mujer') ? 'female' : 'male'
        })).filter(p => p.name);
    }

    function generateBalancedGroups(people, groupCount) {
        // Separar y mezclar
        const females = people.filter(p => p.gender === 'female').sort(() => Math.random() - 0.5);
        const males = people.filter(p => p.gender === 'male').sort(() => Math.random() - 0.5);
        
        // Inicializar grupos vacíos
        const groups = Array.from({ length: groupCount }, () => []);
        
        // Distribuir mujeres equitativamente
        females.forEach((female, i) => groups[i % groupCount].push(female));
        
        // Distribuir hombres
        males.forEach((male, i) => groups[i % groupCount].push(male));
        
        return groups;
    }

    function displayGroups(groups) {
        resultsContainer.innerHTML = '';
        groups.forEach((group, i) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            groupDiv.innerHTML = `<h3>Grupo ${i + 1} (${group.length} personas)</h3>` +
                group.map(p => `<span class="person ${p.gender}">${p.name}</span>`).join('');
            resultsContainer.appendChild(groupDiv);
        });
    }
});