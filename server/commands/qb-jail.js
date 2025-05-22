/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "jail",
    description: "Manage a player's jail sentence",
    role: "mod,police",

    options: [
        {
            type: "SUB_COMMAND",
            name: "sentence",
            description: "place player in jail",
            options: [
                {
                    name: "id",
                    description: "Player's current id",
                    required: true,
                    type: "INTEGER",
                },
                {
                    name: "time",
                    description: "How long in minutes to jail player for",
                    required: true,
                    type: "INTEGER",
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "free",
            description: "free player from jail",
            options: [
                {
                    name: "id",
                    description: "Player's current id",
                    required: true,
                    type: "INTEGER",
                },
            ],
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "This ID seems invalid.", ephemeral: true });
        if (args.sentence) {
            if (args.time < 5) return interaction.reply({ content: "Jail time need to be more than 5 seconds", ephemeral: true });
            const player = client.QBCore.Functions.GetPlayer(args.id);
            const d = new Date();
            // Stupid hack to replicate lua's os.date("*t") for the prison jail script is stupid..
            const currentDate = {
                ["month"]: d.getDate(),
                ["sec"]: d.getSeconds(),
                ["year"]: d.getFullYear(),
                ["day"]: (d.getDate() > 30) ? 30 : d.getDate(),
                ["min"]: d.getMinutes(),
                ["wday"]: d.getDay() + 1,
                ["isdst"]: false,
                ["yday"]: (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000,
                ["hour"]: d.getHours(),
            };
            player.Functions.SetMetaData("injail", args.time);
            player.Functions.SetMetaData("criminalrecord", { ["hasRecord"]: true, ["date"]: currentDate });
            emitNet("police:client:SendToJail", args.id, parseInt(args.time));
            emitNet("QBCore:Notify", args.id, `You were sent to prison for ${args.time} months`);
            client.utils.log.info(`[${interaction.member.displayName}] jailed ${GetPlayerName(args.id)} (${args.id}) for ${args.time} seconds`);
            return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) was jailed for ${args.time} months.`, ephemeral: false });
        } else if (args.free) {
            emitNet("prison:client:UnjailPerson", args.id);
            client.utils.log.info(`[${interaction.member.displayName}] freed ${GetPlayerName(args.id)} (${args.id}) from jail`);
            return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) was set free`, ephemeral: false });
        }
    },
};
