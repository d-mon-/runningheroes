# Running Heroes: interview

##configuration

support: mongoDB > 3.0 & nodeJS > 12.0


###mise en place de la base de donnée
lancer la commande dans le terminal pour importer les utilisateurs dans la DB runningheroes et la collection users:

```
mongoimport /db runningheroes /c users /jsonArray /file {yourpath}users.json
```

une fois les utilisateurs importés, rentrer dans le shell mongo en important les fonctions présent dans mongo_scripts/build.js, puis lancer-les:

```
mongo {yourpath}build.js --shell
use runningheroes
projection.project_user()
```

Ces commandes vont modifier la structure des objets stockés dans la base de donnée en regroupant le champ latitude et longitude dans un même array geo:[<lng>,<lat>], pour ensuite créer un index 2dsphere. Ce qui va nous permettre de lancer des requêtes nous permettans de "capturer" les users les proches d'un point triés du plus proche au plus éloigné.
<do not reinvent the wheel>gt

```js
//search all users whithin 20km
db.users.find({'locations.geo': { $near:{$geometry:{type:"point", coordinates:[2.3522219000000177, 48.856614]}, $maxDistance : 20000 }}});
```


##Lancer l'application
deux environnements:
pour l'environnement de developpement, utilisez:
> npm run start

pour l'environnement de production, utilisez (écriture des logs dans le dossier log):
>npm run start_production

Normalement je préfère logger les erreurs dans une collection special pour pouvoir les traiter par la suite. Ici, j'ai voulu tester la rotation des fichiers de logs avec winston.



