para hacer funcionar esta aplicacion localmente se necesita:

1 tener un archivo .env en la carpeta raiz con los siguientes contenidos:

""""

CSV_URL = http://cswcl.github.io/fake-api/monumentos_historicos_extracto.csv
GEOJSON_URL = https://cswcl.github.io/fake-api/monumentos_historicos_extracto.geojson
PORT= 3000

""""
2 cambiar la url en linea 17 en /public/index.js a http://localhost:3000/api/map

3 ejecutar el comando "npm run start" desde la carpeta raiz para iniciar el servidor node.js 

3 desde el navegador visital la pagina "http://localhost:3000/"

3 si se desea ver los contenidos de el geojson file que es modificado por el servidor y enviado a la pagina, visitar "http://localhost:3000/api/map"