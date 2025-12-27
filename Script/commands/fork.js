module.exports.config = {
    name: "fork",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Send YouTube channel and GitHub fork link with intro text",
    commandCategory: "other",
    usages: "fork",
    cooldowns: 0,
};

module.exports.run = async function({ api, event }) {
    const message = 
        "Toxic Bangali ছোট বেলায় কত কষ্ট করে মাতৃভাষার সব ধরনের গা'লি শিখছিলাম। কিন্ত চর্চা করার অভাবে অধিকাংশ গালি ই ভুলে যেতে বসেছি। মাঝে মাঝে কিছু পোস্ট দেখলে মন চায় গা'লি গুলা পুনরায় চর্চা করি। কিন্তু দুঃখজনক হলেও সত্যি কিছু বন্ধু ও আত্মীয়-স্বজনদের স্ক্রিনশটের ভয়ে তা করা হয় না। আমাদের ঐতিহ্যবাহী গা'লি গুলা আজ বিলুপ্তির পথে.... আমি সত্যি হতাশ।" +
        "" +
        "" +
        "" +
        "" +
        "";

    return api.sendMessage(message, event.threadID, event.messageID);
};
