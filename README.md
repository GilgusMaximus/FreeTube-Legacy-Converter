# FreeTube Legacy Converter Documentation
This NodeJS program is designed to work along with the Rewrite of [FreeTube](https://github.com/FreeTubeApp/FreeTube) and allows you to convert your old user data to the new formats.

Currently supported are:
* Subscriptions (including profile assignment)
* Watch history


## Installation
You can download already built executables from the releases tab or install NodeJS, download the code and run it yourself.

##Usage
This program currently provides 3 commands for the user:
#### Subscriptions
`./ft-convert -subs -op /path/to/old/file/subscriptions.db -np /path/to/new/file/profiles.db -toProfiles true/false`

The -toProfiles option tells the program how to insert the subscriptions. If the value is true, then all channels are added to the profiles they were part of in the old FreeTube. Non existing profiles are created.
If the value is false, then one profile is created where all subscriptions are added into, and the subscription are **not** added to the All Channels profile.
 
 #### History
 `./ft-convert -history -op /path/to/old/file/subscriptions.db -np /path/to/new/file/profiles.db`

 #### Running from source
 If you download the code and want to run it, replace the `./ft-convert` with `node index.js`
