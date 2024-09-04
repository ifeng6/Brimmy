# Brimmy
Custom Discord Bot that has many simple commands, such as converting text, picking a number from a range.
The bot is also focused on providing a user friendly interface for the Riot Games API on a social platform.
Main features of the bot:
- **SpongeMock**: Converts text to alternating cases (for example, "Welcome to Bikini Bottom" gets converted to "WElCoMe To BiKiNi BoTtOm")
- **League of Legends Champion Masteries**: Returns your champions with the highest mastery level (max 25 champs)
- **Free Champion Rotation**: Returns the free-to-play champions for the week
- **ARAM Champions Adjustments**: Returns ARAM specific balance changes for a given champion, or a list of all of the ARAM balance changes.

## Configuration
Use ```node <file_name>``` to run configuration files.
- ```deploy-commands.js``` deploys slash commands to server(s).
- ```load-champ-data.js``` loads League of Legends champion data for other slash commands to use (such as user champion mastery data)
    - when ran, will create a new file called champData.json with champion data from the newest patch/version.

The ARAM function uses Python libraries to web-scrape ARAM balance changes, so make sure to install the packages by running ```pip install -r requirements.txt``` in the home directory.