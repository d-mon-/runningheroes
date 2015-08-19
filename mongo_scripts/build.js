//mongo version >= 3.0
//gather lng and lat in the same array "locations.geo":[<lng>,<lat>] and create a 2dsphere index.
//arrays are preferred in mongo to store coordinates.

var projection = {
	'project_user': function project_user(){	
		//We only want to change data that store both: lat and lng
		var _users = db.users.find({'locations.lng':{$exists:true},'locations.lat':{$exists:true}});
		while(_users.hasNext()){
	 		var _user = _users.next();

			_user.locations.geo = [];
			_user.locations.geo[0] = _user.locations.lng;
			_user.locations.geo[1] = _user.locations.lat;
  	 		delete _user.locations.lng;
	 		delete _user.locations.lat;

	 		var _r = db.users.save(_user);
			_user.__writeResult = _r;
	 		printjson(_user);
		}
		this.create_indexes();
	},
	'create_indexes':function create_indexes(){
		//it is not ensureIndex anymore in mongo 3.0
		var _r = db.users.createIndex({'locations.geo':"2dsphere"});
		printjson(_r);
		_r = db.users.createIndex({'email':1},{unique:true});
		printjson(_r);
 	}
}



