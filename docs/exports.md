# Exports

If you have other resources that you wish to be able to use information available in Overwatch, you might just be in luck. Here is a list of all the available exports for Overwatch and samples of how to use them in javascript or lua. If you don't see something you want here [submit a feature request](https://github.com/EngineerShawn/Overwatch/issues/new/choose) or [pull request](https://github.com/EngineerShawn/Overwatch/pulls)

#### Table of Contents
- [isRolePresent](#isrolepresent)
- [getDiscordId](#getDiscordId)
- [getRoles](#getroles)
- [getName](#getname)
- [log](#log)

### isRolePresent
Returns a true/false boolean if a role is present for a role id or array of role-ids

```js
// JAVASCRIPT EXAMPLE
// Source - Discord Role ID
const bool = global.exports.Overwatch.isRolePresent(global.source, "897991948097433681");

// Discord ID - Array of Roles
const bool = global.exports.Overwatch.isRolePresent("142831624868855808", [
    "897991948097433681",
    "897991948097433682"
]);
```
```lua
-- LUA EXAMPLE
-- Source - Discord Role ID
local bool = exports.Overwatch:isRolePresent(source, "897991948097433681");

-- Discord ID - Array of Roles
local bool = exports.Overwatch:isRolePresent("142831624868855808", {
    "897991948097433681",
    "897991948097433682"
});
```


### getDiscordId
Returns a player's discord id

```js
// JAVASCRIPT EXAMPLE
const id = global.exports.Overwatch.getDiscordId(global.source);
```
```lua
-- LUA EXAMPLE
local id = exports.Overwatch:getDiscordId(source);
```



### getRoles
Returns an array of roles for a discord id or source

```js
// JAVASCRIPT EXAMPLE
// Source
const roles = global.exports.Overwatch.getRoles(global.source);

// Discord ID
const roles = global.exports.Overwatch.getRoles("142831624868855808");
```
```lua
-- LUA EXAMPLE
-- Source
local roles = exports.Overwatch:getRoles(source);

-- Discord ID
local roles = exports.Overwatch:getRoles("142831624868855808");
```


### getName
Returns an string containing the discord name/nickname for a discord id or source

```js
// JAVASCRIPT EXAMPLE
// Source
const name = global.exports.Overwatch.getName(global.source);

// Discord ID
const name = global.exports.Overwatch.getName("142831624868855808");
```
```lua
-- LUA EXAMPLE
-- Source
local name = exports.Overwatch:getName(source);

-- Discord ID
local name = exports.Overwatch:getName("142831624868855808");
```


### log
send a message to a configured Log webhook

```js
// JAVASCRIPT EXAMPLE
// event, message, pingRole, color (optional)
global.exports.Overwatch.log("modlog", "UserA Banned UserB for Reason", true, "#FF0000");

```
```lua
-- LUA EXAMPLE
-- event, message, pingRole, color (optional)
exports.Overwatch:log("modlog", "UserA Banned UserB for Reason", true, "#FF0000");
```
