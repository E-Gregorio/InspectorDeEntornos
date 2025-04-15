# Analizador de Entornos de Automatización

Una herramienta para detectar, analizar y comparar entornos de desarrollo y testing en diferentes sistemas operativos, con el fin de identificar problemas de compatibilidad entre entornos.

## Descripción

Esta aplicación web permite ejecutar análisis de entornos de automatización en diferentes sistemas operativos (Windows, Linux, macOS, WSL) y comparar los resultados para identificar diferencias que podrían generar problemas en pipelines de CI/CD.

El analizador detecta:
- Lenguajes de programación instalados (Python, Java, Node.js, etc.)
- Navegadores web disponibles
- Herramientas de testing (Selenium, Pytest, Playwright, etc.)
- Herramientas de CI/CD
- Drivers de Selenium
- Frameworks BDD/TDD
- Herramientas móviles
- Y más...

## Características

- **Detección automática** de herramientas y dependencias
- **Interfaz web intuitiva** para seleccionar sistemas operativos y ejecutar análisis
- **Comparación visual** entre diferentes entornos
- **Identificación de riesgos** basada en diferencias de versiones
- **Exportación de informes** para documentación y seguimiento

## Estructura del proyecto

```

analizador-entornos/
├── automation_environment_check.py   # Script Python para análisis del entorno
├── index.html                        # Interfaz web
├── styles.css                        # Estilos CSS
├── script.js                         # Lógica de la aplicación
└── README.md                         # Documentación
```

## Cómo usar

### Requisitos previos

- Python 3.x
- Navegador web moderno (Chrome, Firefox, Edge)

### Instalación

1. Clone este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/analizador-entornos.git
   cd analizador-entornos
   ```

2. Ejecute un servidor HTTP local usando Python:
   ```bash
   python -m http.server 8000
   ```

   Después de ejecutar este comando correctamente, deberías ver un mensaje similar a:
   ```bash
   Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
   ```

3. Accede a la aplicación:
   - Abre tu navegador web
   - Dirígete a: `http://localhost:8000`
   - Verás una lista de archivos en el directorio donde ejecutaste el comando
   - Haz clic en `index.html` para abrir la aplicación

   El servidor permanecerá activo mientras la terminal esté abierta. Puedes detenerlo presionando `Ctrl+C` en la terminal cuando hayas terminado.

### Uso

1. Seleccione el sistema operativo en el que desea realizar el análisis
2. Haga clic en "Ejecutar Análisis"
3. Vea los resultados detallados
4. Ejecute el análisis en otro entorno y luego use "Comparar Entornos" para ver las diferencias
5. Exporte los resultados usando "Exportar Reporte"

## Casos de uso típicos

### Problema: Pruebas locales exitosas pero fallos en CI/CD

1. Ejecute el análisis en su entorno local
2. Ejecute el análisis en el entorno de CI/CD
3. Compare los resultados para identificar diferencias en:
   - Versiones de lenguajes
   - Versiones de drivers de navegador
   - Herramientas de testing faltantes
   - Diferencias en frameworks

### Problema: Inconsistencia entre equipos de desarrollo

1. Cada miembro del equipo ejecuta el análisis en su entorno
2. Comparte los resultados (exportados como JSON)
3. Identifica diferencias que podrían causar problemas
4. Establece una configuración estándar para el equipo

## Solución de problemas comunes

### Diferencias entre Windows y WSL/Linux

Las diferencias más comunes que pueden causar problemas incluyen:

1. **Navegadores**: WSL/Linux suele carecer de navegadores instalados o accesibles
2. **Drivers de Selenium**: Deben instalarse manualmente en cada entorno
3. **Versiones de Python**: Pueden variar significativamente entre sistemas
4. **Java**: Windows suele tener Oracle JDK mientras que Linux usa OpenJDK

### Recomendaciones para unificar entornos

1. Use contenedores Docker para garantizar consistencia
2. Establezca versiones específicas de dependencias en requirements.txt o package.json
3. Cree scripts de configuración para instalar todas las dependencias necesarias
4. Documente las versiones requeridas de cada herramienta

## Cómo funciona

1. El script Python `automation_environment_check.py` analiza el entorno actual y detecta herramientas instaladas
2. La interfaz web permite ejecutar este script y visualizar los resultados
3. La funcionalidad de comparación analiza las diferencias entre entornos y asigna niveles de riesgo
4. El sistema destaca incompatibilidades potenciales que podrían causar problemas

## Limitaciones

- La detección de algunas herramientas depende de que estén en el PATH o en ubicaciones conocidas
- En entornos Linux se requieren permisos adecuados para la detección

## Contribuciones

Las contribuciones son bienvenidas. Por favor, siga estos pasos:

1. Fork el repositorio
2. Cree una rama para su característica (`git checkout -b feature/nueva-caracteristica`)
3. Implemente sus cambios
4. Envíe un pull request

*
ANALIZADOR DE ENTORNOS
python -m http.server 8000

Después de ejecutar este comando correctamente, deberías ver un mensaje similar a:
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
Esto indica que el servidor HTTP está funcionando. Ahora puedes:
1.	Abrir tu navegador web
2.	Ir a la dirección: http://localhost:8000
3.	Verás una lista de archivos en el directorio donde ejecutaste el comando
4.	Haz clic en index.html para abrir la aplicación
El servidor permanecerá activo mientras la terminal esté abierta. Puedes detenerlo presionando Ctrl+C en la terminal cuando hayas terminado.
Este proyecto fue creado para solucionar problemas comunes en entornos de automatización de pruebas y facilitar la depuración de problemas de compatibilidad entre entornos de desarrollo y CI/CD.*