# Brimmy
Custom Discord Bot that has many simple commands, such as converting text, picking a number from a range.
The bot is focused on providing a user friendly interface for the riot games API on a familiar platform.

## Configuration
Use ```node <file_name>``` to run configuration files.
- ```deploy-commands.js``` updates the slash commands.
- ```load-champ-data.js``` loads League of Legends champion data for other slash commands to use (such as user champion mastery data)
    - when ran, will create a new file called champData.json with champion data from the newest patch/version.