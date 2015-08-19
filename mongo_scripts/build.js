//mongo version >= 3.0
//gather lng and lat in the same array "locations.geo":[<lng>,<lat>] and create a 2dsphere index.
//arrays are preferred in mongo to store coordinates.
'use strict';
var projection = {
        'project_user': function project_user() {
        //We only want to change data that store both: lat and lng
            var users = db.users.find({'locations.lng': {$exists: true}, 'locations.lat': {$exists: true}}), user,r;
            while (users.hasNext()) {
                user = users.next();
                user.locations.geo = [];
                user.locations.geo[0] = user.locations.lng;
                user.locations.geo[1] = user.locations.lat;
                delete user.locations.lng;
                delete user.locations.lat;
                r = db.users.save(user);
                user.__writeResult = r;
                printjson(user);
            }
            this.create_indexes();
		},
        'create_indexes': function create_indexes() {
        //it is not ensureIndex anymore in mongo 3.0
            var r = db.users.createIndex({'locations.geo': "2dsphere"});
            printjson(r);
		    r = db.users.createIndex({'email': 1 }, {unique: true});
			printjson(r);
        }
    }



