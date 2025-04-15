// Variables globales
let selectedOS = null;
let analysisResults = {};
let environmentsToCompare = [];

// Datos de ejemplo para la demo (en una aplicación real, estos datos vendrían de ejecutar el script)
const mockData = {
    windows: {
        timestamp: "2025-04-14T05:08:46.294091",
        sistema_operativo: {
            sistema: "Windows",
            version: "10.0.22631",
            arquitectura: "64bit",
            release: "11",
            machine: "AMD64"
        },
        lenguajes: {
            "Python": {
                "comando": "Python 3.13.0",
                "path": "C:\\Users\\ELYER\\AppData\\Local\\Programs\\Python\\Python313\\python.EXE"
            },
            "Java": {
                "comando": "java 21.0.5 2024-10-15 LTS"
            },
            "Node.js": {
                "comando": "v20.10.0"
            },
            "TypeScript": {
                "path": "C:\\Users\\ELYER\\AppData\\Roaming\\npm\\tsc.CMD"
            }
        },
        navegadores: {
            "Google Chrome": {
                "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            },
            "Microsoft Edge": {
                "path": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
            }
        },
        herramientas_testing: {
            "Selenium": {
                "pip_info": "selenium 4.9.1"
            },
            "Pytest": {
                "version": "pytest 7.3.1"
            },
            "Playwright": {
                "pip_info": "playwright 1.49.0"
            },
            "Postman": {
                "installed_path": "C:\\Users\\ELYER\\AppData\\Local\\Postman\\Postman.exe"
            }
        },
        frameworks_testing: {
            "Selenium Python": {
                "pip_info": "selenium 4.9.1"
            },
            "Pytest": {
                "pip_info": "pytest 7.3.1"
            },
            "Playwright": {
                "pip_info": "playwright 1.49.0"
            }
        },
        herramientas_ci_cd: {
            "Docker": {
                "version": "Docker version 27.3.1, build ce12230"
            },
            "Docker Compose": {
                "version": "Docker Compose version v2.30.3-desktop.1"
            },
            "Jenkins": {
                "installed_path": "C:\\Program Files\\Jenkins\\jenkins.exe"
            }
        },
        herramientas_moviles: {
            "Android Studio/SDK": {
                "env_path": "C:\\Users\\ELYER\\AppData\\Local\\Android\\Sdk",
                "adb": "Android Debug Bridge version 1.0.41"
            },
            "Appium": {
                "installed_path": "C:\\Users\\ELYER\\AppData\\Roaming\\npm\\appium"
            }
        },
        herramientas_gestion: {
            "Git": {
                "version": "git version 2.45.2.windows.1"
            }
        },
        drivers_selenium: {
            "drivers": {
                "ChromeDriver": {
                    "version": "ChromeDriver 114.0.5735.90"
                }
            }
        },
        frameworks_bdd: {
            "Behave (Python BDD)": {
                "pip": "behave 1.2.6"
            },
            "Pytest-BDD": {
                "pip": "pytest-bdd 8.1.0"
            }
        },
        frameworks_tdd: {
            "Pytest (Python)": {
                "comando": "pytest 7.3.1"
            }
        }
    },
    linux: {
        timestamp: "2025-04-14T08:15:28.123456",
        sistema_operativo: {
            sistema: "Linux",
            version: "Ubuntu 24.04.2 LTS",
            arquitectura: "64bit",
            release: "5.15.167.4-microsoft-standard-WSL2",
            machine: "x86_64",
            distribucion: "Ubuntu 24.04.2 LTS",
            wsl: true
        },
        lenguajes: {
            "Python": {
                "comando": "Python 3.12.3"
            },
            "Java": {
                "comando": "openjdk 17.0.10 2024-01-16"
            },
            "Node.js": {
                "comando": "v18.17.1"
            }
        },
        navegadores: {
            "Google Chrome": {
                "command": "Google Chrome 125.0.6422.60"
            }
        },
        herramientas_testing: {
            "Selenium": {
                "pip_info": "selenium 4.11.2"
            },
            "Pytest": {
                "version": "pytest 7.4.0"
            },
            "Playwright": {
                "pip_info": "playwright 1.40.0"
            }
        },
        frameworks_testing: {
            "Selenium Python": {
                "pip_info": "selenium 4.11.2"
            },
            "Pytest": {
                "pip_info": "pytest 7.4.0"
            },
            "Playwright": {
                "pip_info": "playwright 1.40.0"
            }
        },
        herramientas_ci_cd: {
            "Docker": {
                "version": "Docker version 24.0.5, build 24.0.5-0ubuntu1~24.04.1"
            }
        },
        herramientas_gestion: {
            "Git": {
                "version": "git version 2.43.2"
            }
        },
        drivers_selenium: {
            "drivers": {
                "ChromeDriver": {
                    "version": "ChromeDriver 125.0.6422.60"
                },
                "GeckoDriver (Firefox)": {
                    "version": "geckodriver 0.34.0"
                }
            }
        },
        frameworks_bdd: {
            "Behave (Python BDD)": {
                "pip": "behave 1.2.6"
            }
        },
        frameworks_tdd: {
            "Pytest (Python)": {
                "comando": "pytest 7.4.0"
            }
        }
    },
    mac: {
        timestamp: "2025-04-14T08:30:45.789012",
        sistema_operativo: {
            sistema: "Darwin",
            version: "Darwin Kernel Version 24.4.0",
            arquitectura: "64bit",
            release: "24.4.0",
            machine: "arm64"
        },
        lenguajes: {
            "Python": {
                "comando": "Python 3.11.7"
            },
            "Java": {
                "comando": "java 20.0.2 2023-07-18"
            },
            "Node.js": {
                "comando": "v16.20.2"
            }
        },
        navegadores: {
            "Google Chrome": {
                "path": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            },
            "Safari": {
                "path": "/Applications/Safari.app/Contents/MacOS/Safari"
            }
        },
        herramientas_testing: {
            "Selenium": {
                "pip_info": "selenium 4.10.0"
            },
            "Pytest": {
                "version": "pytest 7.2.2"
            },
            "Playwright": {
                "pip_info": "playwright 1.38.0"
            }
        },
        frameworks_testing: {
            "Selenium Python": {
                "pip_info": "selenium 4.10.0"
            },
            "Pytest": {
                "pip_info": "pytest 7.2.2"
            }
        },
        herramientas_ci_cd: {
            "Docker": {
                "version": "Docker version 24.0.6"
            },
            "Docker Compose": {
                "version": "Docker Compose version v2.24.5"
            }
        },
        drivers_selenium: {
            "drivers": {
                "ChromeDriver": {
                    "version": "ChromeDriver 122.0.6261.94"
                },
                "Safari Driver": {
                    "version": "Included with Safari"
                }
            }
        },
        frameworks_bdd: {
            "Behave (Python BDD)": {
                "pip": "behave 1.2.6"
            }
        },
        frameworks_tdd: {
            "Pytest (Python)": {
                "comando": "pytest 7.2.2"
            }
        }
    },
    wsl: {
        // Esto podría ser reemplazado con datos reales de WSL una vez que se ejecute el script
        timestamp: "2025-04-14T08:25:15.254789",
        sistema_operativo: {
            sistema: "Linux",
            version: "Ubuntu 24.04.2 LTS",
            arquitectura: "64bit",
            release: "5.15.167.4-microsoft-standard-WSL2",
            machine: "x86_64",
            distribucion: "Ubuntu 24.04.2 LTS",
            wsl: true
        },
        lenguajes: {
            "Python": {
                "comando": "Python 3.12.3"
            },
            "Java": {
                "comando": "openjdk 17.0.10 2024-01-16"
            },
            "Node.js": {
                "comando": "v18.17.1"
            }
        },
        navegadores: {},
        herramientas_testing: {
            "Selenium": {
                "pip_info": "selenium 4.11.2"
            },
            "Pytest": {
                "version": "pytest 7.4.0"
            }
        },
        frameworks_testing: {
            "Selenium Python": {
                "pip_info": "selenium 4.11.2"
            },
            "Pytest": {
                "pip_info": "pytest 7.4.0"
            }
        },
        herramientas_ci_cd: {
            "Docker": {
                "version": "Docker version 24.0.5, build 24.0.5-0ubuntu1~24.04.1"
            }
        },
        herramientas_gestion: {
            "Git": {
                "version": "git version 2.43.2"
            }
        },
        drivers_selenium: {
            "drivers": {}
        },
        frameworks_bdd: {
            "Behave (Python BDD)": {
                "pip": "behave 1.2.6"
            }
        },
        frameworks_tdd: {
            "Pytest (Python)": {
                "comando": "pytest 7.4.0"
            }
        }
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Configurar los event listeners
function setupEventListeners() {
    // Event listeners para botones de OS
    document.querySelectorAll('.os-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectOS(this.id.split('-')[0]);
        });
    });

    // Event listener para ejecutar análisis
    document.getElementById('run-analysis').addEventListener('click', runAnalysis);

    // Event listener para comparar entornos
    document.getElementById('compare-environments').addEventListener('click', showComparisonView);

    // Event listener para exportar reporte
    document.getElementById('export-report').addEventListener('click', exportReport);

    // Event listener para filtro de reporte
    document.getElementById('report-filter').addEventListener('change', function() {
        filterResults(this.value);
    });

    // Event listeners para tabs de comparación
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Seleccionar sistema operativo
function selectOS(os) {
    selectedOS = os;
    
    // Actualizar UI para mostrar selección
    document.querySelectorAll('.os-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${os}-btn`).classList.add('active');
    
    // Mostrar mensaje informativo
    document.getElementById('results-container').innerHTML = `
        <div class="placeholder-msg">
            Sistema operativo ${os} seleccionado. Haz clic en "Ejecutar Análisis" para comenzar.
        </div>
    `;
}

// Añadir eventos de carga de archivos JSON
document.addEventListener('DOMContentLoaded', function() {
    // Botón para abrir selector de archivos
    document.getElementById('load-report-btn').addEventListener('click', function() {
        console.log("Botón de carga presionado");
        document.getElementById('report-file').click();
    });

    // Manejar selección de archivo
    document.getElementById('report-file').addEventListener('change', function(event) {
        console.log("Archivo seleccionado");
        const file = event.target.files[0];
        if (!file) {
            console.log("No se seleccionó ningún archivo");
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                console.log("Archivo leído");
                const data = JSON.parse(e.target.result);
                
                // Determinar el sistema operativo
                let osKey = 'windows';
                if (data.sistema_operativo.sistema.toLowerCase().includes('linux')) {
                    osKey = data.sistema_operativo.wsl ? 'wsl' : 'linux';
                } else if (data.sistema_operativo.sistema.toLowerCase().includes('darwin')) {
                    osKey = 'mac';
                }
                
                // Actualizar la interfaz
                console.log(`Detectado sistema: ${osKey}`);
                selectOS(osKey);
                analysisResults[osKey] = data;
                
                if (!environmentsToCompare.includes(osKey)) {
                    environmentsToCompare.push(osKey);
                    if (environmentsToCompare.length > 2) {
                        environmentsToCompare.shift();
                    }
                }
                
                displayResults(data);
                alert(`Reporte de ${osKey} cargado correctamente`);
                
            } catch (error) {
                console.error("Error al procesar el archivo:", error);
                alert(`Error al procesar el archivo: ${error.message}`);
            }
        };
        
        reader.onerror = function() {
            console.error("Error al leer el archivo");
            alert("Error al leer el archivo");
        };
        
        console.log("Iniciando lectura del archivo");
        reader.readAsText(file);
    });
});

// Ejecutar análisis
function runAnalysis() {
    if (!selectedOS) {
        alert("Por favor, selecciona un sistema operativo primero.");
        return;
    }
    
    // En una implementación real, aquí se ejecutaría el script Python
    // Para este prototipo, utilizamos datos de ejemplo
    const results = mockData[selectedOS];
    analysisResults[selectedOS] = results;
    
    // Almacenar para comparaciones futuras
    if (!environmentsToCompare.includes(selectedOS)) {
        environmentsToCompare.push(selectedOS);
        // Limitamos a 2 entornos para comparar
        if (environmentsToCompare.length > 2) {
            environmentsToCompare.shift();
        }
    }
    
    // Mostrar resultados
    displayResults(results);
}

// Mostrar vista de comparación
function showComparisonView() {
    if (environmentsToCompare.length < 2) {
        alert("Por favor, ejecuta el análisis en al menos dos entornos diferentes para comparar.");
        return;
    }
    
    // Mostrar la sección de comparación
    document.getElementById('comparison-section').classList.remove('hidden');
    
    // Obtener los datos de los entornos a comparar
    const env1 = environmentsToCompare[0];
    const env2 = environmentsToCompare[1];
    const data1 = analysisResults[env1];
    const data2 = analysisResults[env2];
    
    // Llenar las pestañas con los datos de comparación
    populateDifferencesTab(env1, env2, data1, data2);
    populateCompatibleTab(env1, env2, data1, data2);
    populateAllComparisonTab(env1, env2, data1, data2);
    
    // Hacer scroll a la sección de comparación
    document.getElementById('comparison-section').scrollIntoView({ behavior: 'smooth' });
}

// Llenar la pestaña de diferencias
function populateDifferencesTab(env1, env2, data1, data2) {
    const tbody = document.getElementById('differences-table-body');
    tbody.innerHTML = '';
    
    // Crear una lista de todas las diferencias con su nivel de riesgo
    const differences = getDifferences(env1, env2, data1, data2);
    
    if (differences.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No se encontraron diferencias significativas entre los entornos.</td></tr>`;
        return;
    }
    
    // Ordenar por nivel de riesgo (high > medium > low)
    differences.sort((a, b) => {
        const riskLevel = { 'high': 3, 'medium': 2, 'low': 1 };
        return riskLevel[b.risk] - riskLevel[a.risk];
    });
    
    // Llenar la tabla
    differences.forEach(diff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${diff.tool}</td>
            <td>${diff.type}</td>
            <td>${diff.env1Version || 'No detectado'}</td>
            <td>${diff.env2Version || 'No detectado'}</td>
            <td class="risk-${diff.risk}">${getRiskLevelText(diff.risk)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Llenar la pestaña de herramientas compatibles
function populateCompatibleTab(env1, env2, data1, data2) {
    const compatibleList = document.getElementById('compatible-list');
    compatibleList.innerHTML = '';
    
    // Obtener herramientas compatibles
    const compatibleTools = getCompatibleTools(data1, data2);
    
    if (compatibleTools.length === 0) {
        compatibleList.innerHTML = '<li>No se encontraron herramientas totalmente compatibles entre los entornos.</li>';
        return;
    }
    
    // Llenar la lista
    compatibleTools.forEach(tool => {
        const item = document.createElement('li');
        item.textContent = `${tool.name} (${tool.category}): ${tool.version}`;
        compatibleList.appendChild(item);
    });
}

// Llenar la pestaña de comparación completa
function populateAllComparisonTab(env1, env2, data1, data2) {
    const tbody = document.getElementById('all-comparison-body');
    tbody.innerHTML = '';
    
    // Obtener todas las categorías
    const categories = [
        { key: 'lenguajes', name: 'Lenguajes' },
        { key: 'navegadores', name: 'Navegadores' },
        { key: 'herramientas_testing', name: 'Testing' },
        { key: 'frameworks_testing', name: 'Frameworks' },
        { key: 'herramientas_ci_cd', name: 'CI/CD' },
        { key: 'herramientas_moviles', name: 'Móviles' },
        { key: 'herramientas_gestion', name: 'Gestión' },
        { key: 'drivers_selenium', name: 'Drivers', subKey: 'drivers' },
        { key: 'frameworks_bdd', name: 'BDD' },
        { key: 'frameworks_tdd', name: 'TDD' }
    ];
    
    // Agregar cada categoría
    categories.forEach(category => {
        // Obtener herramientas de la categoría
        let tools1 = category.subKey ? 
            (data1[category.key] && data1[category.key][category.subKey] ? data1[category.key][category.subKey] : {}) : 
            (data1[category.key] || {});
            
        let tools2 = category.subKey ? 
            (data2[category.key] && data2[category.key][category.subKey] ? data2[category.key][category.subKey] : {}) : 
            (data2[category.key] || {});
        
        // Crear conjunto de todas las herramientas
        const allTools = new Set([...Object.keys(tools1), ...Object.keys(tools2)]);
        
        // Si hay herramientas, agregarlas a la tabla
        if (allTools.size > 0) {
            allTools.forEach(tool => {
                const row = document.createElement('tr');
                
                // Obtener información de versión
                const version1 = getVersionInfo(tools1[tool] || null);
                const version2 = getVersionInfo(tools2[tool] || null);
                
                // Determinar si hay diferencia
                const hasDifference = tools1[tool] && tools2[tool] && version1 !== version2;
                const missing1 = !tools1[tool];
                const missing2 = !tools2[tool];
                
                row.innerHTML = `
                    <td>${category.name}</td>
                    <td>${tool}</td>
                    <td class="${missing1 ? 'risk-high' : (hasDifference ? 'risk-medium' : '')}">${version1 || 'No detectado'}</td>
                    <td class="${missing2 ? 'risk-high' : (hasDifference ? 'risk-medium' : '')}">${version2 || 'No detectado'}</td>
                `;
                
                tbody.appendChild(row);
            });
        }
    });
}

// Obtener diferencias entre entornos
function getDifferences(env1, env2, data1, data2) {
    const differences = [];
    
    // Verificar diferencias de lenguajes
    compareTools(differences, 'Lenguaje', env1, env2, data1.lenguajes || {}, data2.lenguajes || {});
    
    // Verificar diferencias de navegadores
    compareTools(differences, 'Navegador', env1, env2, data1.navegadores || {}, data2.navegadores || {});
    
    // Verificar diferencias de herramientas de testing
    compareTools(differences, 'Herramienta Testing', env1, env2, data1.herramientas_testing || {}, data2.herramientas_testing || {});
    
    // Verificar diferencias de CI/CD
    compareTools(differences, 'CI/CD', env1, env2, data1.herramientas_ci_cd || {}, data2.herramientas_ci_cd || {});
    
    // Verificar diferencias de drivers
    if (data1.drivers_selenium && data1.drivers_selenium.drivers && 
        data2.drivers_selenium && data2.drivers_selenium.drivers) {
        compareTools(differences, 'Driver', env1, env2, data1.drivers_selenium.drivers, data2.drivers_selenium.drivers);
    }
    
    // Verificar diferencias de frameworks BDD
    compareTools(differences, 'Framework BDD', env1, env2, data1.frameworks_bdd || {}, data2.frameworks_bdd || {});
    
    // Verificar diferencias de frameworks TDD
    compareTools(differences, 'Framework TDD', env1, env2, data1.frameworks_tdd || {}, data2.frameworks_tdd || {});
    
    return differences;
}

// Comparar herramientas entre dos entornos
function compareTools(differences, type, env1, env2, tools1, tools2) {
    // Conjunto de todas las herramientas
    const allTools = new Set([...Object.keys(tools1), ...Object.keys(tools2)]);
    
    allTools.forEach(tool => {
        const hasInEnv1 = tool in tools1;
        const hasInEnv2 = tool in tools2;
        
        // Obtener información de versión
        const version1 = getVersionInfo(tools1[tool] || null);
        const version2 = getVersionInfo(tools2[tool] || null);
        
        // Determinar si hay diferencia y el nivel de riesgo
        if (!hasInEnv1 || !hasInEnv2) {
            // Falta en uno de los entornos
            differences.push({
                tool,
                type,
                env1Version: hasInEnv1 ? version1 : null,
                env2Version: hasInEnv2 ? version2 : null,
                risk: 'high'
            });
        } else if (version1 !== version2) {
            // Versiones diferentes
            // Determinar si es una diferencia menor o mayor
            const riskLevel = isMinorVersionDifference(version1, version2) ? 'low' : 'medium';
            
            differences.push({
                tool,
                type,
                env1Version: version1,
                env2Version: version2,
                risk: riskLevel
            });
        }
    });
}

// Obtener herramientas compatibles entre entornos
function getCompatibleTools(data1, data2) {
    const compatibleTools = [];
    
    // Definir categorías a verificar
    const categories = [
        { key: 'lenguajes', name: 'Lenguaje' },
        { key: 'navegadores', name: 'Navegador' },
        { key: 'herramientas_testing', name: 'Testing' },
        { key: 'frameworks_testing', name: 'Framework' },
        { key: 'herramientas_ci_cd', name: 'CI/CD' },
        { key: 'herramientas_moviles', name: 'Móvil' },
        { key: 'herramientas_gestion', name: 'Gestión' }
    ];
    
    // Verificar cada categoría
    categories.forEach(category => {
        const tools1 = data1[category.key] || {};
        const tools2 = data2[category.key] || {};
        
        // Buscar herramientas comunes
        Object.keys(tools1).forEach(tool => {
            if (tool in tools2) {
                const version1 = getVersionInfo(tools1[tool]);
                const version2 = getVersionInfo(tools2[tool]);
                
                // Si las versiones son exactamente iguales
                if (version1 === version2) {
                    compatibleTools.push({
                        name: tool,
                        category: category.name,
                        version: version1
                    });
                }
            }
        });
    });
    
    // Verificar drivers
    if (data1.drivers_selenium && data1.drivers_selenium.drivers && 
        data2.drivers_selenium && data2.drivers_selenium.drivers) {
        
        const drivers1 = data1.drivers_selenium.drivers;
        const drivers2 = data2.drivers_selenium.drivers;
        
        Object.keys(drivers1).forEach(driver => {
            if (driver in drivers2) {
                const version1 = getVersionInfo(drivers1[driver]);
                const version2 = getVersionInfo(drivers2[driver]);
                
                if (version1 === version2) {
                    compatibleTools.push({
                        name: driver,
                        category: 'Driver',
                        version: version1
                    });
                }
            }
        });
    }
    
    return compatibleTools;
}

// Obtener nivel de riesgo como texto
function getRiskLevelText(risk) {
    switch(risk) {
        case 'high':
            return 'Alto';
        case 'medium':
            return 'Medio';
        case 'low':
            return 'Bajo';
        default:
            return 'Desconocido';
    }
}

// Obtener información de versión de una herramienta
function getVersionInfo(toolInfo) {
    if (!toolInfo) return null;
    
    if (toolInfo.version) {
        return toolInfo.version;
    } else if (toolInfo.comando) {
        return toolInfo.comando;
    } else if (toolInfo.pip_info) {
        return toolInfo.pip_info;
    } else if (toolInfo.pip) {
        return toolInfo.pip;
    } else {
        return 'Detectado';
    }
}

// Determinar si la diferencia entre versiones es menor
function isMinorVersionDifference(version1, version2) {
    if (!version1 || !version2) return false;
    
    // Extraer números de versión (ejemplo: "v1.2.3" -> "1.2.3")
    const getVersionNumbers = (version) => {
        const match = version.match(/[0-9]+\.[0-9]+\.[0-9]+/);
        return match ? match[0] : version;
    };
    
    const v1 = getVersionNumbers(version1);
    const v2 = getVersionNumbers(version2);
    
    // Si no se pueden extraer los números, considerar diferencia mayor
    if (v1 === version1 || v2 === version2) return false;
    
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    // Si las versiones mayores son diferentes, es una diferencia mayor
    if (parts1[0] !== parts2[0]) return false;
    
    // Si solo la versión menor o el parche son diferentes, es una diferencia menor
    return true;
}

// Exportar reporte
function exportReport() {
    if (!selectedOS || !analysisResults[selectedOS]) {
        alert("Por favor, ejecuta un análisis primero.");
        return;
    }
    
    const resultData = analysisResults[selectedOS];
    
    // Crear un objeto blob con los datos
    const blob = new Blob([JSON.stringify(resultData, null, 2)], { type: 'application/json' });
    
    // Crear URL para el blob
    const url = URL.createObjectURL(blob);
    
    // Crear enlace temporal y descargar
    const a = document.createElement('a');
    a.href = url;
    a.download = `entorno_${selectedOS}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    
    // Liberar URL
    URL.revokeObjectURL(url);
}

// Mostrar resultados del análisis
function displayResults(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    // Información del Sistema Operativo
    const osInfo = document.createElement('div');
    osInfo.className = 'system-info';
    let osDetails = '';
    
    if (results.sistema_operativo.sistema === 'Windows') {
        osDetails = `${results.sistema_operativo.sistema} ${results.sistema_operativo.release} (${results.sistema_operativo.arquitectura})`;
    } else if (results.sistema_operativo.sistema === 'Linux') {
        osDetails = results.sistema_operativo.distribucion ? 
            `${results.sistema_operativo.distribucion} (${results.sistema_operativo.arquitectura})` :
            `${results.sistema_operativo.sistema} ${results.sistema_operativo.release} (${results.sistema_operativo.arquitectura})`;
        
        if (results.sistema_operativo.wsl) {
            osDetails += ' en WSL';
        }
    } else {
        osDetails = `${results.sistema_operativo.sistema} ${results.sistema_operativo.release} (${results.sistema_operativo.arquitectura})`;
    }
    
    osInfo.innerHTML = `
        <h3>Sistema: ${osDetails}</h3>
        <p>Análisis realizado el: ${new Date(results.timestamp).toLocaleString()}</p>
    `;
    container.appendChild(osInfo);
    
    // Lenguajes
    addCategorySection(container, 'Lenguajes de Programación', results.lenguajes);
    
    // Navegadores
    addCategorySection(container, 'Navegadores', results.navegadores);
    
    // Herramientas de Testing
    addCategorySection(container, 'Herramientas de Testing', results.herramientas_testing);
    
    // Frameworks de Testing
    addCategorySection(container, 'Frameworks de Testing', results.frameworks_testing);
    
    // CI/CD
    addCategorySection(container, 'Herramientas CI/CD', results.herramientas_ci_cd);
    
    // Herramientas de Gestión
    addCategorySection(container, 'Herramientas de Gestión', results.herramientas_gestion);
    
    // Drivers de Selenium
    if (results.drivers_selenium && results.drivers_selenium.drivers) {
        addCategorySection(container, 'Drivers de Selenium', results.drivers_selenium.drivers);
    }
    
    // Frameworks BDD
    addCategorySection(container, 'Frameworks BDD', results.frameworks_bdd);
    
    // Frameworks TDD
    addCategorySection(container, 'Frameworks TDD', results.frameworks_tdd);
}

// Añadir una sección de categoría al contenedor de resultados
function addCategorySection(container, title, items) {
    const section = document.createElement('div');
    section.className = 'result-category';
    section.setAttribute('data-category', title.toLowerCase().replace(/\s+/g, '-'));
    section.innerHTML = `<h3>${title}</h3>`;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'result-items';
    
    // Si no hay elementos, mostrar mensaje
    if (!items || Object.keys(items).length === 0) {
        itemsContainer.innerHTML = '<div class="empty-message">No se detectaron herramientas en esta categoría</div>';
    } else {
        // Añadir cada elemento
        for (const [name, info] of Object.entries(items)) {
            const item = document.createElement('div');
            item.className = 'result-item found';
            
            // Obtener versión o información relevante
            let versionInfo = '';
            if (info.version) {
                versionInfo = info.version;
            } else if (info.comando) {
                versionInfo = info.comando;
            } else if (info.pip_info) {
                versionInfo = info.pip_info;
            } else if (info.pip) {
                versionInfo = info.pip;
            } else if (info.path) {
                versionInfo = `Ruta: ${info.path}`;
            } else if (info.installed_path) {
                versionInfo = `Instalado en: ${info.installed_path}`;
            } else {
                versionInfo = 'Detectado';
            }
            
            item.innerHTML = `
                <div class="tool-name">${name}</div>
                <div class="tool-version">${versionInfo}</div>
            `;
            
            itemsContainer.appendChild(item);
        }
    }
    
    section.appendChild(itemsContainer);
    container.appendChild(section);
}

// Filtrar resultados por categoría
function filterResults(category) {
    const categories = {
        'languages': 'Lenguajes de Programación',
        'browsers': 'Navegadores',
        'testing-tools': 'Herramientas de Testing',
        'ci-cd': 'Herramientas CI/CD',
        'mobile': 'Herramientas Móviles',
        'drivers': 'Drivers de Selenium',
        'frameworks': 'Frameworks'
    };
    
    const resultSections = document.querySelectorAll('.result-category');
    
    if (category === 'all') {
        // Mostrar todas las categorías
        resultSections.forEach(section => {
            section.style.display = 'block';
        });
    } else {
        // Mostrar solo la categoría seleccionada
        resultSections.forEach(section => {
            const sectionTitle = section.querySelector('h3').textContent;
            
            if (category === 'frameworks') {
                // Caso especial para frameworks que incluye BDD y TDD
                if (sectionTitle.includes('Framework')) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            } else {
                if (sectionTitle === categories[category]) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            }
        });
    }

// Añadir funcionalidad para cargar reportes JSON
document.getElementById('load-report-btn').addEventListener('click', function() {
    document.getElementById('report-file').click();
});

document.getElementById('report-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Determinar el sistema operativo basado en el reporte
            let osKey = 'windows';
            
            if (data.sistema_operativo.sistema.toLowerCase().includes('linux')) {
                osKey = data.sistema_operativo.wsl ? 'wsl' : 'linux';
            } else if (data.sistema_operativo.sistema.toLowerCase().includes('darwin')) {
                osKey = 'mac';
            }
            
            // Seleccionar el OS en la interfaz
            selectOS(osKey);
            
            // Guardar resultados
            analysisResults[osKey] = data;
            
            // Añadir a la lista de comparación
            if (!environmentsToCompare.includes(osKey)) {
                environmentsToCompare.push(osKey);
                if (environmentsToCompare.length > 2) {
                    environmentsToCompare.shift();
                }
            }
            
            // Mostrar resultados
            displayResults(data);
            
            alert(`Reporte cargado correctamente para ${osKey}`);
            
        } catch (error) {
            alert('Error al leer el archivo: ' + error);
        }
    };
    reader.readAsText(file);
});
}