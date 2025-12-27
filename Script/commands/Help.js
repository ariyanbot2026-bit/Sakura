const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.config = {
  name: "help",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ARIYAN",
  description: "Shows all commands with details",
  commandCategory: "system",
  usages: "[command name/page number]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": `╭━━━━━━━━━━━━━━━━╮
┃ ☠️ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 ☠️
┣━━━━━━━━━━━┫
┃ 🔖 Name: %1
┃ 📄 Usage: %2
┃ 📜 Description: %3
┃ 🔑 Permission: %4
┃ 👨‍💻 Credit: %5
┃ 📂 Category: %6
┃ ⏳ Cooldown: %7s
┣━━━━━━━━━━━━━━━━┫
┃ ⚙ Prefix: %8
┃ 🤖 Bot Name: %9
┃ 👑 Owner: 𝐀𝐑𝐈𝐘𝐀𝐍
╰━━━━━━━━━━━━━━━━╯`,
    "helpList": "[ Total %1 commands | Use \"%2help commandName\" ]",
    "user": "User",
    "adminGroup": "Admin Group",
    "adminBot": "Admin Bot"
  }
};

// 🔥 Help command image (তোমার দেওয়া)
const helpImages = [
  "https://i.imgur.com/aiGTO4b.jpeg"
];

function downloadImages(callback) {
  const randomUrl = helpImages[Math.floor(Math.random() * helpImages.length)];
  const filePath = path.join(__dirname, "cache", "help_random.jpg");

  request(randomUrl)
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => callback([filePath]));
}

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || body.indexOf("help") != 0) return;

  const splitBody = body.trim().split(/\s+/);
  if (splitBody.length < 2 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const detail = getText(
    "moduleInfo",
    command.config.name,
    command.config.usages || "Not Provided",
    command.config.description || "Not Provided",
    command.config.hasPermssion,
    command.config.credits || "Unknown",
    command.config.commandCategory || "Unknown",
    command.config.cooldowns || 0,
    prefix,
    global.config.BOTNAME || "☠️ ARIYAN CHAT BOT ☠️"
  );

  downloadImages(files => {
    api.sendMessage(
      {
        body: detail,
        attachment: files.map(f => fs.createReadStream(f))
      },
      threadID,
      () => files.forEach(f => fs.unlinkSync(f)),
      messageID
    );
  });
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  if (args[0] && commands.has(args[0].toLowerCase())) {
    const command = commands.get(args[0].toLowerCase());

    const detailText = getText(
      "moduleInfo",
      command.config.name,
      command.config.usages || "Not Provided",
      command.config.description || "Not Provided",
      command.config.hasPermssion,
      command.config.credits || "Unknown",
      command.config.commandCategory || "Unknown",
      command.config.cooldowns || 0,
      prefix,
      global.config.BOTNAME || "☠️ ARIYAN CHAT BOT ☠️"
    );

    downloadImages(files => {
      api.sendMessage(
        {
          body: detailText,
          attachment: files.map(f => fs.createReadStream(f))
        },
        threadID,
        () => files.forEach(f => fs.unlinkSync(f)),
        messageID
      );
    });
    return;
  }

  const arrayInfo = Array.from(commands.keys()).sort();
  const page = Math.max(parseInt(args[0]) || 1, 1);
  const numberOfOnePage = 20;
  const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);
  const start = numberOfOnePage * (page - 1);
  const helpView = arrayInfo.slice(start, start + numberOfOnePage);

  const list = helpView.map(cmd => `┃ ✪ ${cmd}`).join("\n");

  const text = `╭━━━━━━━━━━━━━━━━╮
┃ 📜 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 📜
┣━━━━━━━━━━━━━━━┫
┃ 📄 Page: ${page}/${totalPages}
┃ 🧮 Total: ${arrayInfo.length}
┣━━━━━━━━━━━━━━━━┫
${list}
┣━━━━━━━━━━━━━━━━┫
┃ ⚙ Prefix: ${prefix}
┃ 🤖 Bot Name: ☠️ ARIYAN CHAT BOT ☠️
┃ 👑 Owner: 𝐀𝐑𝐈𝐘𝐀𝐍
╰━━━━━━━━━━━━━━━━╯`;

  downloadImages(files => {
    api.sendMessage(
      {
        body: text,
        attachment: files.map(f => fs.createReadStream(f))
      },
      threadID,
      () => files.forEach(f => fs.unlinkSync(f)),
      messageID
    );
  });
};
