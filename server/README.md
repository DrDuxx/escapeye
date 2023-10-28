### DB Config ###
- Create user:
``` sql
CREATE ROLE escape WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
```
- Create DB:
``` javascript
node ./config/db.create.js
```
- Migrate DB:
``` javascript
node ./config/db.migrate.js
```





Todo:
### Escape
- Game section
- add new riddle back button
- Testing
- fixing bugs
- optimize


### Monopoly
- Monitor (Mr Monopoly)
- ScoreBoard and display... maybe with sounds too
- Jail with player name..
- 


### Notes
``` javascript
// detect full screen 
if (screen.width == window.innerWidth && screen.height == window.innerHeight) {
    //full web browser
}
```