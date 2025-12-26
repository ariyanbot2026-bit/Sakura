const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "1.0.0",
    author: "ARIYAN",
    description: "Show all commands in categorized menu",
    commandCategory: "system",
    usages: "{pn}help",
  },

  run: async function({ api, event, args, prefix, globalGoatBot }) {
    try {
      // সব commands map
      const allCommands = global.GoatBot.commands; 
      if (!allCommands) return api.sendMessage("❌ Commands not loaded!", event.threadID);

      // category wise group করা
      const categories = {};
      for (const [name, cmd] of allCommands) {
        const cat = (cmd.config.category || "others").toLowerCase();
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd.config.name);
      }

      // fancy font map
      const fontMap = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ",
        h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ",
        o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ",
        v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
      };
      const fancy = (str) => str.replace(/[a-z]/g, (c) => fontMap[c] || c);

      // category emoji
      const emojiMap = {
        fun: "😂", owner: "👑", system: "⚙️", media: "🎬",
        admin: "🛡️", game: "🎮", info: "ℹ️", others: "📁"
      };

      // message তৈরি
      let msg = `╔═━✧ ${fancy("ARIYAN BOT MENU")} ✧━═╗\n\n`;
      for (const cat of Object.keys(categories)) {
        const emoji = emojiMap[cat] || "📁";
        msg += `╔─ ${emoji} ${fancy(cat.toUpperCase())}\n`;
        msg += categories[cat].sort().map(c => ` • ${fancy(c)}`).join("\n") + "\n╚─━━━━━\n\n";
      }
      msg += `╔═━✧ ɪɴғᴏ ✧━═╗\n`;
      msg += `Total Commands : ${allCommands.size}\n`;
      msg += `Prefix         : ${prefix}\n`;
      msg += `Creator        : ARIYAN\n`;
      msg += `╚═━✧ END ✧━═╝`;

      return api.sendMessage(msg, event.threadID);

    } catch (e) {
      console.log(e);
      return api.sendMessage("❌ Something went wrong in help command!", event.threadID);
    }
  }
};
