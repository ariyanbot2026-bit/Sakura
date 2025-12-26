const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
 name: "owner2",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "ARIYAN",
 description: "Display bot owner's information",
 commandCategory: "Info",
 usages: "",
 cooldowns: 5,
 dependencies: {
 request: "",
 "fs-extra": "",
 axios: ""
 }
};

module.exports.run = async function ({ api, event }) {
 const imageUrl = "https://i.imgur.com/PPNygBD.jpeg";
 const path = __dirname + "/cache/owner.png";

 request(imageUrl)
 .pipe(fs.createWriteStream(path))
 .on("close", () => {
 api.sendMessage({
 body:
`🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟

👑 𝗡𝗮𝗺𝗲: ARIYAN 😈
😻 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: নিজের জগতে একা 👑
💼 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻: Silent Villain 🖤

🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: Mood থাকলে অনলাইন 😌
💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿: দরকার হলে নিজেই নক দে 😎
📺 𝗬𝗼𝘂𝗧𝘂𝗯𝗲: একদিন সব দেখবি 🔥
📸 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: কম কথা, বেশি vhondami 😏
📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: Private Life 🚫
🎵 𝗧𝗶𝗸𝗧𝗼𝗸: download  দিলে Future বউ ধইরা মারব😌 
👻 𝗦𝗻𝗮𝗽𝗰𝗵𝗮𝘁: Filter নয়, Real Face 😈

🤖 𝗕𝗢𝗧 𝗕𝗬: ─꯭─⃝‌‌𝐀𝐑𝐈𝐘𝐀𝐍 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
`,
 attachment: fs.createReadStream(path)
 }, event.threadID, () => fs.unlinkSync(path));
 });
};
