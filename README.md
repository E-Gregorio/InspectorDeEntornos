
# 🔎 **InspectorDeEntornos**

![License](https://img.shields.io/badge/license-MIT-green)
![Last Commit](https://img.shields.io/github/last-commit/E-Gregorio/InspectorDeEntornos)
![Issues](https://img.shields.io/github/issues/E-Gregorio/InspectorDeEntornos)
![Stars](https://img.shields.io/github/stars/E-Gregorio/InspectorDeEntornos?style=social)

**InspectorDeEntornos** es una herramienta web de diagnóstico y comparación de entornos de automatización de pruebas, diseñada para detectar y solucionar problemas de compatibilidad entre diferentes sistemas operativos y entornos de desarrollo.

---

## 📘 **Descripción**

**InspectorDeEntornos** te permite analizar configuraciones de entornos de automatización en sistemas operativos como **Windows**, **macOS**, **Linux** y **WSL**. Esta herramienta ayuda a identificar diferencias que podrían causar problemas en entornos de desarrollo y **CI/CD**.

### **¿Qué detecta?**

- Versiones de lenguajes de programación: **Python**, **Node.js**, **Java**, etc.
- Navegadores web instalados.
- Herramientas de testing: **Playwright**, **Selenium**, **Pytest**, etc.
- Frameworks BDD/TDD.
- Drivers de Selenium y herramientas de CLI.
- Herramientas móviles (Android SDK, etc.).
- Dependencias del ecosistema **DevOps**.

---

## 🔧 **Características**

- **Detección automática** de herramientas y dependencias en tu entorno.
- **Interfaz web intuitiva** para ejecutar análisis.
- **Comparación visual** de resultados entre entornos.
- **Identificación de riesgos** y problemas potenciales.
- **Exportación de informes** en formato JSON para seguimiento y documentación.

---

## 🗂️ **Estructura del Proyecto**

```bash
InspectorDeEntornos/
├── automation_environment_check.py   # Script principal en Python
├── index.html                        # Interfaz web
├── styles.css                        # Estilos CSS
├── script.js                         # Lógica de la app
└── README.md                         # Documentación
```

---

## 📋 **Requisitos**

- **Python 3.x**
- **Navegador web moderno**: Chrome, Firefox, Edge, etc.

---

## 🚀 **COMO EJECUTAR LA APLICACION LOCALMENTE**

### 1. **Clonar el repositorio**

```bash
git clone https://github.com/E-Gregorio/InspectorDeEntornos.git
cd InspectorDeEntornos
```

### 2. **EJECUTAR UN SERVIDOR HTTP LOCAL CON PYTHON**

```bash
python -m http.server 8000
```

Esto lanzará un servidor local que podrás acceder en **<http://localhost:8000>**.

### 3. **ABRIR LA APLICACION**

- Abre tu navegador y ve a [http://localhost:8000](http://localhost:8000).
- Haz clic en **index.html** para comenzar.

El servidor se mantendrá activo mientras la terminal esté abierta. Puedes detenerlo presionando **Ctrl + C**.

---

## 🧪 **Uso Paso a Paso**

1. **Selecciona el sistema operativo** donde deseas realizar el análisis.
2. Haz clic en **"Ejecutar Análisis"** para iniciar el diagnóstico.
3. Revisa los **resultados detallados** de tu entorno.
4. **Compara entornos**: ejecuta el análisis en otro sistema y usa la opción de **"Comparar Entornos"**.
5. **Exporta el informe** (opcional) en formato JSON.

---

## 🧩 **Casos de Uso**

### 💥 **CI/CD con Errores de Configuración**

1. Ejecuta el análisis en tu entorno local.
2. Ejecuta el análisis en el entorno CI/CD (Ej. GitHub Actions).
3. **Compara los resultados** para identificar discrepancias en versiones de herramientas, configuraciones y dependencias.

### 👥 **Equipos con Entornos Desalineados**

1. Cada miembro del equipo ejecuta el análisis en su entorno.
2. Comparan y exportan los resultados.
3. Definen un **entorno común** o ajustan las configuraciones necesarias.

---

## 💡 **Recomendaciones para Estandarizar Entornos**

- **Docker**: Utiliza contenedores para garantizar consistencia en todos los entornos.
- **Dependencias**: Mantén los archivos de dependencias (**requirements.txt**, **package.json**) actualizados.
- **Automatización**: Utiliza scripts para instalar las dependencias necesarias de forma automática.
- **Documentación**: Registra y versiona las dependencias y versiones de herramientas requeridas.

---

## ❗ **Limitaciones**

- La detección depende de la configuración del **PATH** y las rutas conocidas.
- En **Linux**, algunas herramientas pueden requerir permisos adicionales.
- El análisis no detecta software instalado fuera de las rutas estándar.

---

## 🛠️ **Contribuciones**

¡Las contribuciones son bienvenidas! ✨

### Pasos para contribuir

1. **Fork** el repositorio.
2. Crea una nueva rama para tu característica:
   bash
   git checkout -b feature/nueva-caracteristica

3. Realiza tus cambios.
4. Abre un **Pull Request** con una descripción detallada de los cambios.

---

## 📄 **Licencia**

Este proyecto está bajo la **licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**¡Gracias por utilizar InspectorDeEntornos!** 😊
