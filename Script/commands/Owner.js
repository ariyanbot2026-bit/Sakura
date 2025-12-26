const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "ARIYAN",
  description: "Villain Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  const info = `
╔═════════════════════ 🩸
║ 😈 𝗩𝗜𝗟𝗟𝗔𝗜𝗡 𝗢𝗪𝗡𝗘𝗥 😈
╠═════════════════════ 🩸
║ 👑 𝗡𝗮𝗺𝗲 : 𝗔𝗥𝗜𝗬𝗔𝗡
║ 🕶️ 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : 𝗦𝗶𝗹𝗲𝗻𝘁 𝗩𝗶𝗹𝗹𝗮𝗶𝗻
║ 🎂 𝗔𝗴𝗲 : 18+
║ 💔 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : שђ๏ภ๔ค๓เ
║ 🌑 𝗔𝘁𝘁𝗶𝘁𝘂𝗱𝗲 : Calm but Dangerous
║ 🧠 𝗠𝗶𝗻𝗱 : Cold & Focused
╠═════════════════════ 🩸
║ 🔥 𝗩𝗜𝗟𝗟𝗔𝗜𝗡 𝗥𝗨𝗟𝗘𝗦
╠═════════════════════ 🩸
║ • কথা কম, কাজ বেশি
║ • বিশ্বাস করি না, প্রমাণ দেখি
║ • শত্রু ভুলিনা, সময় আসলে শেষ করি
╠═════════════════════ 🩸
║ 🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║ m.me/ariyan.ahmed.nai.Bangladesh.a
╚═════════════════════ 🩸
`;

  const images = [
    "https://i.imgur.com/pyUAVFi.jpeg",
    "https://i.imgur.com/Zp9nVDE.jpeg",
    "https://i.imgur.com/yVHCfdZ.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];
  const imgPath = __dirname + "/cache/owner.jpg";

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(imgPath)
    },
    event.threadID,
    () => fs.unlinkSync(imgPath)
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", () => callback());
};
