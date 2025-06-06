/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

const { MessageEmbed, WebhookClient } = require("discord.js");

class Log {
    constructor(z) {
        this.z = z;
        this.enabled = z.config.EnableLoggingWebhooks;
        this.hooks = {};

        if (this.enabled) {
            StopResource("qb-logs");
            let count = 0;
            Object.entries(z.config.LoggingWebhooks).forEach(entry => {
                const [key, value] = entry;
                const k = key.toLocaleLowerCase();
                if (this.hooks[k]) return client.z.utils.log.write(`Webhook for ${k} has already been registered. Remove the duplicate key`, { tag: "WEBHOOK", error: true });
                this.hooks[k] = new WebhookClient({ url: value.replace(/discordapp/g, "discord") });
                count++;
            });
            this.z.utils.log.info(`${count} webhooks loaded.`, { tag: "WEBHOOK" });
        }
        global.exports("log", async (type, message, pingRole, color) => {
            return z.log.send(type, message, { pingRole: pingRole, color: color });
        });
    }

    /** Sends a log through to a webhook by name configured in config
     * @param {string} type - type of log/event to pick which webhook to send
     * @param {string} message - Message to log
     * @param {boolean} pingRole - Whether message should ping configured role
     * @param {object} options - pingRole, color, username, pingId
     * @returns {boolean} - success or failure of logging event */
    async send(type, message, options) {
        if (!this.enabled) return false;
        if (!message || !type) return this.z.utils.log.write("Log without message or type not permitted", { tag: "WEBHOOK", error: true });

        const hook = this.hooks[type.toLocaleLowerCase()];
        if (!hook) return this.z.utils.log.write(`Webhook "${type}" is not defined. Message: ${message}`, { tag: "WEBHOOK", error: true });

        const embed = new MessageEmbed().setDescription(message).setColor(options.color || "#1e90ff");
        const data = {
            username: options.username || this.z.config.LoggingWebhookName,
            embeds: [ embed ],
        };
        if (options.pingRole) data.content = `<@${options.pingId || this.z.config.LoggingAlertPingId}>`;

        await hook.send(data).catch((e) => {
            return this.z.utils.log.write(`${type.toLowerCase()} log failed. Message: ${message}. Error: ${reply.status}`, { tag: "WEBHOOK", error: true });
        });
        return true;
    }

}

module.exports = Log;
