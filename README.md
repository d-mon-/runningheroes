# Running Heroes: interview

##configuration

support: mongoDB > 3.0 & nodeJS > 12.0


###mise en place de la base de donn�e
lancer la commande dans le terminal pour importer les utilisateurs dans la DB runningheroes et la collection users:

```
mongoimport /db runningheroes /c users /jsonArray /file {yourpath}users.json
```

une fois les utilisateurs import�s, rentrer dans le shell mongo en important les fonctions pr�sent dans mongo_scripts/build.js, puis lancer-les:

```
mongo {yourpath}build.js --shell
use runningheroes
projection.project_user()
```

Ces commandes vont modifier la structure des objets stock�s dans la base de donn�e en regroupant le champ latitude et longitude dans un m�me array geo:[<lng>,<lat>], pour ensuite cr�er un index 2dsphere. Ce qui va nous permettre de lancer des requ�tes nous permettans de "capturer" les users les proches d'un point tri�s du plus proche au plus �loign�.
<do not reinvent the wheel>gt

```js
//search all users whithin 20km
db.users.find({'locations.geo': { $near:{$geometry:{type:"point", coordinates:[2.3522219000000177, 48.856614]}, $maxDistance : 20000 }}});
```


##Lancer l'application
deux environnements:
pour l'environnement de developpement, utilisez:
> npm run start

pour l'environnement de production, utilisez (�criture des logs dans le dossier log):
>npm run start_production

Normalement je pr�f�re logger les erreurs dans une collection special pour pouvoir les traiter par la suite. Ici, j'ai voulu tester la rotation des fichiers de logs avec winston.



