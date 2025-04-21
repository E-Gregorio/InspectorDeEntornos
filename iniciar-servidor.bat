@echo off
cd /d C:\Scripts\analizador-entornos
echo Iniciando servidor local en http://localhost:8000...
start http://localhost:8000
python -m http.server 8000
pause
