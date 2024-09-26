import samirapi from 'samirapi';

const config = {
    name: "fbdl",
    aliases: ["fbdownload", "fbvideo"],
    description: "Download a Facebook video from the provided link.",
    usage: "[video URL]",
    cooldown: 5,
    permissions: [1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "XaviaTeam",
};

const langData = {
    lang_1: { message: "Downloading Facebook video, please wait..." },
    lang_2: { message: "Video download in progress..." },
};

/** @type {TOnCallCommand} */
async function onCall({ message, args, getLang }) {
    if (!args[0]) {
        return message.send("Please provide a Facebook video URL.");
    }

    const videoUrl = args[0];
    
    try {
        const msgData = await message.send(getLang("message"));
        const data = await samirapi.facebook(videoUrl);

        // Assuming 'data' contains the download URL
        if (data && data.downloadUrl) {
            await msgData.reply(`Here is your video: ${data.downloadUrl}`);
        } else {
            await msgData.reply("Sorry, I couldn't retrieve the video. Please check the URL.");
        }
    } catch (error) {
        console.error(error);
        await message.send("An error occurred while trying to download the video.");
    }
}

/** @type {TReplyCallback} */
async function onReply({ message }) {
    // Handle reply events if needed
}

/** @type {TReactCallback} */
async function onReaction({ message }) {
    // Handle reaction events if needed
}

// Exporting the config and command handler as specified
export default {
    config,
    onCall,
};