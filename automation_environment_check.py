#!/usr/bin/env python3
import sys
import subprocess
import platform
import json
import os
from datetime import datetime
import traceback

print("Iniciando verificación de entorno...")
print(f"Python versión: {sys.version}")
print(f"Sistema operativo: {platform.system()} {platform.version()}")

class AutomationEnvironmentChecker:
    def __init__(self):
        self.is_windows = platform.system() == "Windows"
        self.is_linux = platform.system() == "Linux"
        self.is_mac = platform.system() == "Darwin"
        self.is_wsl = self.is_linux and "microsoft" in platform.uname().release.lower() if hasattr(platform, 'uname') else False
        
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "sistema_operativo": self.get_system_info(),
            "lenguajes": {},
            "navegadores": {},
            "herramientas_testing": {},
            "frameworks_testing": {},
            "herramientas_ci_cd": {},
            "herramientas_moviles": {},
            "herramientas_gestion": {},
            "drivers_selenium": {},
            "frameworks_bdd": {},
            "frameworks_tdd": {}
        }
        
        print("Inicialización completada.")

    def get_system_info(self):
        print("Obteniendo información del sistema...")
        info = {
            "sistema": platform.system(),
            "version": platform.version(),
            "arquitectura": platform.architecture()[0],
            "release": platform.release(),
            "machine": platform.machine()
        }
        
        if self.is_linux:
            # Intentar obtener distribución Linux
            try:
                with open('/etc/os-release', 'r') as f:
                    lines = f.readlines()
                    for line in lines:
                        if line.startswith('PRETTY_NAME='):
                            info["distribucion"] = line.split('=')[1].strip().strip('"')
                            break
            except:
                pass
            
            if self.is_wsl:
                info["wsl"] = True
        
        print(f"Sistema detectado: {info['sistema']} {info['version']}")
        return info

    def run_command(self, comando, params=None, ignore_errors=True):
        try:
            if params:
                resultado = subprocess.run([comando] + params, 
                                           capture_output=True, 
                                           text=True, 
                                           shell=False,
                                           timeout=5)
            else:
                resultado = subprocess.run(comando, 
                                           capture_output=True, 
                                           text=True, 
                                           shell=True,
                                           timeout=5)
            
            if resultado.returncode == 0:
                return resultado.stdout.strip() or resultado.stderr.strip()
            elif not ignore_errors:
                return None
            else:
                return None
        except Exception as e:
            # Silenciar errores si se solicita
            if not ignore_errors:
                print(f"Error ejecutando '{comando}': {str(e)}")
            return None

    def find_executable(self, name):
        """Busca un ejecutable en el PATH del sistema"""
        try:
            import shutil
            return shutil.which(name)
        except Exception:
            return None

    def check_file_exists(self, paths):
        """Verifica si alguno de los paths existe"""
        for path in paths:
            if os.path.exists(path):
                return path
        return None

    def verificar_lenguajes(self):
        print("\nVerificando lenguajes de programación...")
        lenguajes = {
            "Python": {
                "comando": self.run_command("python", ["--version"]) or self.run_command("python3", ["--version"]),
                "path": self.find_executable("python") or self.find_executable("python3"),
            },
            "Java": {
                "comando": self.run_command("java", ["--version"]) or self.run_command("java", ["-version"]),
                "path": self.find_executable("java"),
            },
            "Node.js": {
                "comando": self.run_command("node", ["--version"]),
                "path": self.find_executable("node"),
                "npm": self.run_command("npm", ["--version"]),
            },
            "TypeScript": {
                "comando": self.run_command("tsc", ["--version"]),
                "path": self.find_executable("tsc"),
            },
            "Go": {
                "comando": self.run_command("go", ["version"]),
                "path": self.find_executable("go")
            }
        }
        
        for lang, info in lenguajes.items():
            if info["comando"] or info["path"]:
                self.report["lenguajes"][lang] = {k: v for k, v in info.items() if v}
                print(f"  ✓ {lang} detectado")
            else:
                print(f"  ✗ {lang} no detectado")

    def verificar_navegadores(self):
        print("\nVerificando navegadores...")
        navegadores_windows = {
            "Google Chrome": {
                "paths": [
                    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
                ],
            },
            "Mozilla Firefox": {
                "paths": [
                    r"C:\Program Files\Mozilla Firefox\firefox.exe",
                    r"C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
                ],
            },
            "Microsoft Edge": {
                "paths": [
                    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
                    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
                ],
            }
        }
        
        navegadores_linux = {
            "Google Chrome": {
                "paths": [
                    "/usr/bin/google-chrome",
                    "/usr/bin/google-chrome-stable"
                ],
                "command": self.run_command("google-chrome", ["--version"]) or self.run_command("google-chrome-stable", ["--version"])
            },
            "Mozilla Firefox": {
                "paths": [
                    "/usr/bin/firefox",
                    "/usr/bin/firefox-esr"
                ],
                "command": self.run_command("firefox", ["--version"]) or self.run_command("firefox-esr", ["--version"])
            }
        }
        
        navegadores = navegadores_windows if self.is_windows else navegadores_linux
        
        for name, info in navegadores.items():
            found = False
            browser_info = {}
            
            # Verificar por comando
            if info.get("command"):
                browser_info["version"] = info["command"]
                found = True
            
            # Verificar por paths
            for path in info.get("paths", []):
                if os.path.exists(path):
                    browser_info["path"] = path
                    found = True
                    break
            
            if found:
                self.report["navegadores"][name] = browser_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_herramientas_testing(self):
        print("\nVerificando herramientas de testing...")
        herramientas = {
            "Selenium": {
                "pip": self.run_command("pip", ["show", "selenium"]),
                "path": self.find_executable("selenium")
            },
            "Pytest": {
                "comando": self.run_command("pytest", ["--version"]),
                "pip": self.run_command("pip", ["show", "pytest"]),
            },
            "Playwright": {
                "pip": self.run_command("pip", ["show", "playwright"]),
            },
            "Appium": {
                "comando": self.run_command("appium", ["--version"]),
                "npm": self.run_command("npm", ["list", "-g", "appium"]),
            },
            "Postman": {
                "paths": [
                    r"C:\Program Files\Postman\Postman.exe",
                    r"C:\Users\%USERNAME%\AppData\Local\Postman\Postman.exe"
                ] if self.is_windows else [
                    "/usr/bin/postman",
                    "/opt/postman/Postman"
                ]
            },
            "JMeter": {
                "comando": self.run_command("jmeter", ["--version"]),
                "paths": [
                    r"C:\Program Files\Apache JMeter\bin\jmeter.bat"
                ] if self.is_windows else [
                    "/usr/bin/jmeter",
                    "/opt/apache-jmeter/bin/jmeter"
                ]
            }
        }
        
        for name, info in herramientas.items():
            found = False
            tool_info = {}
            
            # Verificar mediante comando
            if info.get("comando"):
                tool_info["version"] = info["comando"]
                found = True
            
            # Verificar mediante pip
            if info.get("pip"):
                tool_info["pip_info"] = info["pip"]
                found = True
            
            # Verificar mediante npm
            if info.get("npm"):
                tool_info["npm_info"] = info["npm"]
                found = True
            
            # Verificar mediante path
            if info.get("path"):
                tool_info["path"] = info["path"]
                found = True
            
            # Verificar rutas específicas
            if "paths" in info:
                for path in info["paths"]:
                    expanded_path = os.path.expandvars(path)
                    if os.path.exists(expanded_path):
                        tool_info["installed_path"] = expanded_path
                        found = True
                        break
            
            if found:
                self.report["herramientas_testing"][name] = tool_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_herramientas_gestion(self):
        print("\nVerificando herramientas de gestión...")
        herramientas = {
            "Git": {
                "comando": self.run_command("git", ["--version"]),
                "path": self.find_executable("git")
            },
            "GitLab CLI": {
                "comando": self.run_command("gitlab", ["--version"]) or self.run_command("glab", ["--version"]),
            },
            "GitHub CLI": {
                "comando": self.run_command("gh", ["--version"]),
            }
        }
        
        for name, info in herramientas.items():
            found = False
            tool_info = {}
            
            # Verificar mediante comando
            if info.get("comando"):
                tool_info["version"] = info["comando"]
                found = True
            
            # Verificar mediante path
            if info.get("path"):
                tool_info["path"] = info["path"]
                found = True
            
            if found:
                self.report["herramientas_gestion"][name] = tool_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_herramientas_ci_cd(self):
        print("\nVerificando herramientas de CI/CD...")
        herramientas_ci = {
            "Docker": {
                "comando": self.run_command("docker", ["--version"]),
                "path": self.find_executable("docker")
            },
            "Docker Compose": {
                "comando": self.run_command("docker-compose", ["--version"]),
                "path": self.find_executable("docker-compose")
            },
            "Jenkins": {
                "comando": self.run_command("jenkins", ["--version"]),
                "paths": [
                    r"C:\Program Files\Jenkins\jenkins.exe",
                    r"C:\Program Files (x86)\Jenkins\jenkins.exe"
                ] if self.is_windows else [
                    "/usr/bin/jenkins",
                    "/usr/share/jenkins/jenkins.war"
                ]
            }
        }
        
        for name, info in herramientas_ci.items():
            found = False
            tool_info = {}
            
            # Verificar mediante comando
            if info.get("comando"):
                tool_info["version"] = info["comando"]
                found = True
            
            # Verificar mediante path
            if info.get("path"):
                tool_info["path"] = info["path"]
                found = True
            
            # Verificar rutas específicas
            if "paths" in info:
                for path in info["paths"]:
                    if os.path.exists(path):
                        tool_info["installed_path"] = path
                        found = True
                        break
            
            if found:
                self.report["herramientas_ci_cd"][name] = tool_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_herramientas_moviles(self):
        print("\nVerificando herramientas móviles...")
        android_paths = [
            r"C:\Users\%USERNAME%\AppData\Local\Android\Sdk",
            r"C:\Program Files\Android\Android Studio"
        ] if self.is_windows else [
            "/home/$USER/Android/Sdk",
            "/opt/android-studio"
        ]
        
        appium_paths = [
            r"C:\Program Files\Appium",
            r"C:\Users\%USERNAME%\AppData\Roaming\npm\appium"
        ] if self.is_windows else [
            "/usr/local/bin/appium",
            "/usr/bin/appium"
        ]
        
        herramientas_moviles = {
            "Android Studio/SDK": {
                "paths": android_paths,
                "env": os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT"),
                "adb": self.run_command("adb", ["--version"])
            },
            "Appium": {
                "paths": appium_paths,
                "comando": self.run_command("appium", ["--version"]),
                "npm": self.run_command("npm", ["list", "-g", "appium"])
            }
        }
        
        for name, info in herramientas_moviles.items():
            found = False
            tool_info = {}
            
            # Verificar mediante comando
            if info.get("comando"):
                tool_info["version"] = info["comando"]
                found = True
            
            # Verificar mediante npm
            if info.get("npm"):
                tool_info["npm_info"] = info["npm"]
                found = True
            
            # Verificar mediante variables de entorno
            if info.get("env"):
                tool_info["env_path"] = info["env"]
                found = True
            
            # Verificar adb
            if info.get("adb"):
                tool_info["adb"] = info["adb"]
                found = True
            
            # Verificar rutas específicas
            if "paths" in info:
                for path in info["paths"]:
                    expanded_path = os.path.expandvars(path)
                    if os.path.exists(expanded_path):
                        tool_info["installed_path"] = expanded_path
                        found = True
                        break
            
            if found:
                self.report["herramientas_moviles"][name] = tool_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_drivers_selenium(self):
        print("\nVerificando drivers de Selenium...")
        drivers = {
            "ChromeDriver": {
                "comando": self.run_command("chromedriver", ["--version"]),
                "path": self.find_executable("chromedriver"),
                "paths": [
                    r"C:\WebDrivers\chromedriver.exe",
                    r"C:\Program Files\ChromeDriver\chromedriver.exe",
                    r"C:\selenium\chromedriver.exe"
                ] if self.is_windows else [
                    "/usr/bin/chromedriver",
                    "/usr/local/bin/chromedriver"
                ]
            },
            "GeckoDriver (Firefox)": {
                "comando": self.run_command("geckodriver", ["--version"]),
                "path": self.find_executable("geckodriver"),
                "paths": [
                    r"C:\WebDrivers\geckodriver.exe",
                    r"C:\Program Files\GeckoDriver\geckodriver.exe",
                    r"C:\selenium\geckodriver.exe"
                ] if self.is_windows else [
                    "/usr/bin/geckodriver",
                    "/usr/local/bin/geckodriver"
                ]
            },
            "EdgeDriver": {
                "comando": self.run_command("msedgedriver", ["--version"]),
                "path": self.find_executable("msedgedriver"),
                "paths": [
                    r"C:\WebDrivers\msedgedriver.exe",
                    r"C:\Program Files\EdgeDriver\msedgedriver.exe",
                    r"C:\selenium\msedgedriver.exe"
                ] if self.is_windows else []
            }
        }

        drivers_detectados = {}

        for nombre, info in drivers.items():
            found = False
            driver_info = {}
            
            # Verificar mediante comando
            if info.get("comando"):
                driver_info["version"] = info["comando"]
                found = True
            
            # Verificar mediante path
            if info.get("path"):
                driver_info["path"] = info["path"]
                found = True
            
            # Verificar rutas específicas
            if "paths" in info:
                for path in info["paths"]:
                    expanded_path = os.path.expandvars(path) if self.is_windows else path
                    if os.path.exists(expanded_path):
                        driver_info["installed_path"] = expanded_path
                        found = True
                        break
            
            if found:
                drivers_detectados[nombre] = driver_info
                print(f"  ✓ {nombre} detectado")
            else:
                print(f"  ✗ {nombre} no detectado")

        # Sistemas operativos compatibles
        sistemas_operativos = {
            "Windows": platform.platform() if self.is_windows else None,
            "Linux": self.run_command("uname", ["-a"]) if self.is_linux else None,
            "MacOS": platform.platform() if self.is_mac else None
        }

        self.report["drivers_selenium"] = {
            "drivers": drivers_detectados,
            "sistemas_operativos": {k: v for k, v in sistemas_operativos.items() if v}
        }

    def verificar_frameworks_testing(self):
        print("\nVerificando frameworks de testing...")
        frameworks = {
            "Selenium Python": {
                "pip": self.run_command("pip", ["show", "selenium"])
            },
            "Pytest": {
                "pip": self.run_command("pip", ["show", "pytest"])
            },
            "Playwright": {
                "pip": self.run_command("pip", ["show", "playwright"])
            }
        }
        
        for name, info in frameworks.items():
            found = False
            framework_info = {}
            
            if info.get("pip"):
                framework_info["pip_info"] = info["pip"]
                found = True
            
            if found:
                self.report["frameworks_testing"][name] = framework_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def verificar_frameworks_bdd_tdd(self):
        print("\nVerificando frameworks BDD/TDD...")
        frameworks_bdd = {
            "Behave (Python BDD)": {
                "pip": self.run_command("pip", ["show", "behave"])
            },
            "Pytest-BDD": {
                "pip": self.run_command("pip", ["show", "pytest-bdd"])
            },
            "Cucumber JS": {
                "npm": self.run_command("npm", ["list", "-g", "cucumber"])
            }
        }

        frameworks_tdd = {
            "Unittest (Python)": {
                "existe": "unittest" in self.run_command("python", ["-c", "import unittest; print('Instalado')"])
            },
            "Pytest (Python)": {
                "comando": self.run_command("pytest", ["--version"]),
                "pip": self.run_command("pip", ["show", "pytest"])
            },
            "Mocha (JavaScript)": {
                "comando": self.run_command("mocha", ["--version"]),
                "npm": self.run_command("npm", ["list", "-g", "mocha"])
            },
            "Jest (JavaScript)": {
                "comando": self.run_command("jest", ["--version"]),
                "npm": self.run_command("npm", ["list", "-g", "jest"])
            }
        }

        # Frameworks BDD
        self.report["frameworks_bdd"] = {}
        for name, info in frameworks_bdd.items():
            found = False
            framework_info = {}
            
            for key, value in info.items():
                if value:
                    framework_info[key] = value
                    found = True
            
            if found:
                self.report["frameworks_bdd"][name] = framework_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")
        
        # Frameworks TDD
        self.report["frameworks_tdd"] = {}
        for name, info in frameworks_tdd.items():
            found = False
            framework_info = {}
            
            for key, value in info.items():
                if value:
                    framework_info[key] = value
                    found = True
            
            if found:
                self.report["frameworks_tdd"][name] = framework_info
                print(f"  ✓ {name} detectado")
            else:
                print(f"  ✗ {name} no detectado")

    def generar_reporte(self):
        try:
            print("\n" + "=" * 60)
            print("VERIFICACIÓN DE ENTORNO DE AUTOMATIZACIÓN")
            print("=" * 60)
            
            self.verificar_lenguajes()
            self.verificar_navegadores()
            self.verificar_herramientas_testing()
            self.verificar_frameworks_testing()
            self.verificar_herramientas_ci_cd()
            self.verificar_herramientas_gestion()
            self.verificar_herramientas_moviles()
            self.verificar_drivers_selenium()
            self.verificar_frameworks_bdd_tdd()

            print("\n" + "=" * 60)
            print("Generando informe JSON...")
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            hostname = platform.node()
            filename = f"automation_report_{hostname}_{timestamp}.json"
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.report, f, indent=4, ensure_ascii=False)
            
            print(f"Informe generado: {filename}")
            return self.report
            
        except Exception as e:
            print(f"\nERROR durante la generación del reporte: {str(e)}")
            traceback.print_exc()
            return None

def print_detected_info(title, data, empty_msg="No se detectaron elementos"):
    """Imprime información de detección de manera formateada"""
    print(f"\n{title}:")
    if not data:
        print(f"- {empty_msg}")
        return
    
    for name, info in data.items():
        if isinstance(info, dict):
            version_info = ""
            
            # Intentar extraer la versión o información relevante
            if "version" in info:
                version_info = info["version"]
            elif "comando" in info:
                version_info = info["comando"]
            elif "path" in info:
                version_info = f"Encontrado en {info['path']}"
            elif "installed_path" in info:
                version_info = f"Instalado en {info['installed_path']}"
            
            # Si no se encontró información específica, mostrar "Detectado"
            if not version_info:
                version_info = "Detectado"
                
            print(f"- {name}: {version_info}")
        else:
            print(f"- {name}: {info}")

def main():
    try:
        print("\n" + "=" * 60)
        print("INICIANDO VERIFICACIÓN DE ENTORNO DE AUTOMATIZACIÓN")
        print("=" * 60)
        
        scanner = AutomationEnvironmentChecker()
        reporte = scanner.generar_reporte()
        
        if reporte:
            print("\n=== RESUMEN EJECUTIVO ===")
            os_info = reporte['sistema_operativo']
            print(f"Sistema Operativo: {os_info['sistema']} {os_info['version']} ({os_info['arquitectura']})")
            
            print_detected_info("Lenguajes Detectados", reporte['lenguajes'], "No se detectaron lenguajes de programación")
            print_detected_info("Navegadores Detectados", reporte['navegadores'], "No se detectaron navegadores")
            print_detected_info("Herramientas de Testing", reporte['herramientas_testing'], "No se detectaron herramientas de testing")
            print_detected_info("Herramientas de CI/CD", reporte['herramientas_ci_cd'], "No se detectaron herramientas de CI/CD")
            print_detected_info("Herramientas de Gestión", reporte['herramientas_gestion'], "No se detectaron herramientas de gestión")
            
            # Drivers Selenium
            print("\nDrivers de Selenium:")
            if 'drivers' in reporte['drivers_selenium'] and reporte['drivers_selenium']['drivers']:
                for driver, info in reporte['drivers_selenium']['drivers'].items():
                    if 'version' in info:
                        print(f"- {driver}: {info['version']}")
                    elif 'path' in info:
                        print(f"- {driver}: Encontrado en {info['path']}")
                    elif 'installed_path' in info:
                        print(f"- {driver}: Instalado en {info['installed_path']}")
                    else:
                        print(f"- {driver}: Detectado")
            else:
                print("- No se detectaron drivers de Selenium")
            
            # Frameworks BDD/TDD
            print_detected_info("Frameworks BDD", reporte['frameworks_bdd'], "No se detectaron frameworks BDD")
            print_detected_info("Frameworks TDD", reporte['frameworks_tdd'], "No se detectaron frameworks TDD")
        
        print("\n" + "=" * 60)
        print("VERIFICACIÓN COMPLETADA")
        print("=" * 60)
            
    except Exception as e:
        print(f"\nERROR CRÍTICO: {str(e)}")
        traceback.print_exc()
    finally:
        print("\nProceso finalizado.")
        
        # Si estamos en Windows, mantener la ventana abierta
        if platform.system() == "Windows":
            input("\nPresione Enter para salir...")

if __name__ == "__main__":
    main()