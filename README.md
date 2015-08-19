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
>use runningheroes
>projection.project_user()
```

Ces commandes vont modifier la structure des objets stock�s dans la base de donn�e en regroupant le champ latitude et longitude dans un m�me array geo:[<lng>,<lat>], pour ensuite cr�er un index 2dsphere. Ce qui va nous permettre de lancer des requ�tes nous permettant ainsi de "capturer" les users les proches d'un point.
<do not reinvent the wheel>

```js
//search all users whithin 20km
db.users.find({'locations.geo': { $near:{$geometry:{type:"point", coordinates:[2.3522219000000177, 48.856614]}, $maxDistance : 20000 }}});
```




##Lancer l'application
deux environnements:
pour l'environnement de d�veloppement, utilisez:
> npm run start

pour l'environnement de production, utilisez (�criture des logs dans le dossier log):
>npm run start_production

Normalement je pr�f�re logger les erreurs dans une collection sp�cial pour pouvoir les traiter par la suite. Ici, j'ai voulu tester la rotation des fichiers de logs avec winston.


##Test
###pre-install
lancer la commande suivante pour installer jasmine et mocha
```
npm run pre-install-test
```

cela va permettre de pouvoir lancer les diff�rents tests.

#####test unitaire:
```
    npm run test-unit
```

#####test d'integration:
```
    npm run test-integration
```

##enfin
je n'utilise pas de cluster, il y a diff�rentes strat�gies pour le mettre en place, mais vu la tailler du projet je suis rest� sur une architecture assez simple.

de m�me pour l'ajout de coroutine avec co : [lien](https://github.com/tj/co)

enfin, j'avais commenc� � g�rer l'internationalization avec une gestion de code d'erreurs qui requete sur la BDD selon l'user-agent ou le profil de l'utilisateur, mais au final vu que je n'utilise pas de navigateur (chrome -> postman ou ide->test restful service) et pas de page web, j'ai abandonn� l'id�e (pour le moment)

pas de grunt, gulp ou webpack.
jslint se g�re directement dans mon IDE (intellij). et le reste se fait via npm.