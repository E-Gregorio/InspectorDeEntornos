#!/bin/bash
cd /c/Scripts/analizador-entornos || exit
echo "Iniciando servidor en http://localhost:8000..."
xdg-open http://localhost:8000
python3 -m http.server 8000
