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
>use runningheroes
>projection.project_user()
```

Ces commandes vont modifier la structure des objets stockés dans la base de donnée en regroupant le champ latitude et longitude dans un même array geo:[<lng>,<lat>], pour ensuite créer un index 2dsphere. Ce qui va nous permettre de lancer des requêtes nous permettant ainsi de "capturer" les users les proches d'un point.
<do not reinvent the wheel>

```js
//search all users whithin 20km
db.users.find({'locations.geo': { $near:{$geometry:{type:"point", coordinates:[2.3522219000000177, 48.856614]}, $maxDistance : 20000 }}});
```




##Lancer l'application
deux environnements:
pour l'environnement de développement, utilisez:
> npm run start

pour l'environnement de production, utilisez (écriture des logs dans le dossier log):
>npm run start_production

Normalement je préfère logger les erreurs dans une collection spécial pour pouvoir les traiter par la suite. Ici, j'ai voulu tester la rotation des fichiers de logs avec winston.


##Test
###pre-install
lancer la commande suivante pour installer jasmine et mocha
```
npm run pre-install-test
```

cela va permettre de pouvoir lancer les différents tests.

#####test unitaire:
```
    npm run test-unit
```

#####test d'integration:
```
    npm run test-integration
```

##enfin
je n'utilise pas de cluster, il y a différentes stratégies pour le mettre en place, mais vu la tailler du projet je suis resté sur une architecture assez simple.

de même pour l'ajout de coroutine avec co : [lien](https://github.com/tj/co)

enfin, j'avais commencé à gérer l'internationalization avec une gestion de code d'erreurs qui requete sur la BDD selon l'user-agent ou le profil de l'utilisateur, mais au final vu que je n'utilise pas de navigateur (chrome -> postman ou ide->test restful service) et pas de page web, j'ai abandonné l'idée (pour le moment)

pas de grunt, gulp ou webpack.
jslint se gère directement dans mon IDE (intellij). et le reste se fait via npm.