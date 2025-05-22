--[[
 - This file is part of Overwatch.
 - Copyright (C) 2023 Shawn/EngineerShawn
 - source: <https://github.com/EngineerShawn/Overwatch>
 -
 - This work is licensed under the Creative Commons
 - Attribution-NonCommercial-ShareAlike 4.0 International License.
 - To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 - or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
--]]

fx_version "cerulean"
games { "gta5" }

author "EngineerShawn"
description "Discord bot allowlist and more"
repository "https://github.com/EngineerShawn/Overwatch"
version "1.5.0"
license "MIT"
lua54 'yes'

server_script "server/server.js"
client_script "client/client.lua"

dependencies {
    '/server:4890', -- Node16+
    'yarn',
}
