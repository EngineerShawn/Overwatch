/* eslint-disable no-inline-comments */
/*
    Overwatch - by Shawn/EngineerShawn - https://github.com/EngineerShawn/Overwatch - License: CC BY-NC-SA 4.0
    Docs for this file available at https://EngineerShawn.github.io/Overwatch/config or in docs/config.md
*/

/** ******************************
 * GENERAL CONFIGURATION SETTINGS
 ********************************/
require("dotenv").config({ path: `${__dirname}/.env` });
const secret = process.env;


const LanguageLocaleCode = "en";

// PUBLIC VALUES
const FiveMServerName = "SouthSide RP";
const DiscordInviteLink = "https://discord.gg/dvpXzQdbBY";
const FiveMServerIP = "147.189.168.211:30484";

// This spams the console, only enable for testing if needed
const DebugLogs = false;

/** ********************
 * DISCORD BOT SETTINGS
 ***********************/

const EnableDiscordBot = true;

// DISCORD BOT
const DiscordBotToken = secret.DISCORD_BOT_TOKEN;
const DiscordGuildId = "1057519670288203896";

// STAFF CHAT
const EnableStaffChatForwarding = true;
const DiscordStaffChannelId = "1085027205379268619";
const AdditionalStaffChatRoleIds = [
    "1061158047566798899", "1061158049148055612", "1061158058165805150",
];

// WHITELISTING / ALLOWLISTING
const EnableWhitelistChecking = true;
const DiscordWhitelistRoleIds = "1061158182627573820";

// SLASH COMMANDS / DISCORD PERMISSIONS
const EnableDiscordSlashCommands = true;
const DiscordModRoleId = "1061158055326257162";
const DiscordAdminRoleId = "1061158049148055612";
const DiscordGodRoleId = "1061158047566798899";

// DISCORD BOT STATUS
const EnableBotStatusMessages = true;
const BotStatusMessages = ["{servername}", "{playercount} In City"];

// ACE PERMISSIONS
const EnableAutoAcePermissions = false;

// If player has a certain role, then it automatically give that player perms. Example: "group.police" below would give that group
// police permissions without having to edit server.cfg to give those permissions.
const AutoAcePermissions = {
    // "group.police": "policeRoleIdGoesHere",
    // "example2": [ "000000000000000000", "000000000000000000"], // use this syntax for multiple role assignments - example: "group.police":["policeRoleIdGoesHere", "docRoleIdGoesHere", "anyRoleIdYouNeedToHavePolicePermissionsGoesHere"]
};

// Other
const SaveScreenshotsToServer = false;

/** ************************
 * WEBHOOK LOGGING SETTINGS
 **************************/

const EnableLoggingWebhooks = true; // if enabled, this will allow the usage of webhooks to log certain action done in your server.
const LoggingWebhookName = "OverwatchLogs";

// put "&" in front of the id if you're to ping a role
// when the webhook is triggered this is the role you want to notify
const LoggingAlertPingId = "&1061158047566798899";
// example: "bank": "https://discord.com/webhook/...",
const LoggingWebhooks = {
    bank: "https://discord.com/api/webhooks/1070323010197803028/pgGo-eiwP4PpQpPT7W9KPlnRwkmRW_zl8uCXXNeAHycN1-pI8ff83EcXTOdRnJZUZEhe",
};

/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

module.exports = {
    EnableDiscordBot: getConBool("discord_enable_bot", EnableDiscordBot),
    EnableStaffChatForwarding: getConBool(
        "discord_enable_staff_chat",
        EnableStaffChatForwarding,
    ),
    EnableLoggingWebhooks: getConBool(
        "discord_enable_logging_webhooks",
        EnableLoggingWebhooks,
    ),
    DebugLogs: getConBool("discord_debug", DebugLogs),
    DiscordBotToken: GetConvar("discord_token", DiscordBotToken),
    DiscordGuildId: GetConvar("discord_guild_id", DiscordGuildId),
    LanguageLocaleCode: GetConvar("discord_lang", LanguageLocaleCode),
    FiveMServerName: GetConvar("discord_server_name", FiveMServerName),
    DiscordInviteLink: GetConvar("discord_invite", DiscordInviteLink),
    FiveMServerIP: GetConvar("discord_server_ip", FiveMServerIP),
    EnableWhitelistChecking: getConBool(
        "discord_enable_whitelist",
        EnableWhitelistChecking,
    ),
    DiscordWhitelistRoleIds: getConList(
        "discord_whitelist_roles",
        DiscordWhitelistRoleIds,
    ),
    EnableDiscordSlashCommands: getConBool(
        "discord_enable_commands",
        EnableDiscordSlashCommands,
    ),
    DiscordModRoleId: GetConvar("discord_mod_role", DiscordModRoleId),
    DiscordAdminRoleId: GetConvar("discord_admin_role", DiscordAdminRoleId),
    DiscordGodRoleId: GetConvar("discord_god_role", DiscordGodRoleId),
    EnableBotStatusMessages: getConBool(
        "discord_enable_status",
        EnableBotStatusMessages,
    ),
    BotStatusMessages: BotStatusMessages,
    EnableAutoAcePermissions: getConBool(
        "discord_enable_ace_perms",
        EnableAutoAcePermissions,
    ),
    AutoAcePermissions: AutoAcePermissions,
    SaveScreenshotsToServer: getConBool(
        "discord_save_screenshots",
        SaveScreenshotsToServer,
    ),
    DiscordStaffChannelId: GetConvar(
        "discord_staff_channel_id",
        DiscordStaffChannelId,
    ),
    LoggingWebhooks: LoggingWebhooks,
    LoggingAlertPingId: GetConvar(
        "discord_logging_ping_id",
        LoggingAlertPingId,
    ),
    LoggingWebhookName: GetConvar("discord_logging_name", LoggingWebhookName),
    StaffChatRoleIds: [
        GetConvar("discord_mod_role", DiscordModRoleId),
        GetConvar("discord_admin_role", DiscordAdminRoleId),
        GetConvar("discord_god_role", DiscordGodRoleId),
        ...AdditionalStaffChatRoleIds,
    ],
};

/** Returns convar or default value fixed to a true/false boolean
 * @param {boolean|string|number} con - Convar name
 * @param {boolean|string|number} def - Default fallback value
 * @returns {boolean} - parsed bool */
function getConBool(con, def) {
    if (typeof def == "boolean") def = def.toString();
    const ret = GetConvar(con, def);
    if (typeof ret == "boolean") return ret;
    if (typeof ret == "string") {
        return ["true", "on", "yes", "y", "1"].includes(
            ret.toLocaleLowerCase().trim(),
        );
    }
    if (typeof ret == "number") return ret > 0;
    return false;
}

/** returns array of items or default array provided
 * @param {string} con - string of comma separated values
 * @param {string|Array} def - string of comma separated values
 * @returns {object} - array of discord ids */
function getConList(con, def) {
    const ret = GetConvar(con, def);
    if (typeof ret == "string") {
        return ret
            .replace(/[^0-9,]/g, "")
            .replace(/(,$)/g, "")
            .split(",");
    }
    if (Array.isArray(ret)) return ret;
    if (!ret) return [];
}
