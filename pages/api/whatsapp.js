const { Client, LocalAuth } = require("whatsapp-web.js");

if (!global.client) {
  global.client = new Client({
    authStrategy: new LocalAuth({
      dataPath: "whatsapp_auth_testing",
    }),
  });

  global.client.initialize();

  global.client.on("ready", () => {
    console.log("Client is ready!");
  });

  global.client.on("auth_failure", (msg) => {
    console.error("Authentication failed!", msg);
    global.client = null; // Reset client on auth failure
  });

  global.client.on("disconnected", (reason) => {
    console.log("Client disconnected!", reason);
    global.client = null; // Reset client on disconnect
  });
}

const client = global.client; // Use the persistent client

const get_qr = () => {
  return new Promise((resolve, reject) => {
    if (!client.info?.wid) {
      client.once("qr", (qr) => {
        console.log("QR RECEIVED");
        resolve(qr);
      });
    } else {
      console.log(client.info, "Client is already connected");
      resolve(null); // Already connected
    }
  });
};

const check_client_auth = () => {
  return new Promise((resolve, reject) => {
    if (client.info?.wid) {
      console.log("Client is already connected!");
      resolve(true);
    } else {
      client.once("ready", () => {
        console.log("Client is ready!");
        resolve(true);
      });

      client.on("auth_failure", () => {
        console.log("Authentication failed!");
        reject(new Error("Authentication failed"));
      });
    }
  });
};

const get_groups_data = () => {
  return new Promise((resolve, reject) => {
    client
      .getChats()
      .then((chats) => {
        const group_lists = chats.filter((ch) => ch.isGroup);
        resolve(group_lists); // Resolve after filtering is done
      })
      .catch((error) => {
        reject(error); // Handle any errors that occur during getChats
      });
  });
};

export default async function handler(req, res) {
  const { param } = req.query;

  try {
    if (param === "get_qr") {
      const qrValue = await get_qr();
      res.status(200).json({ message: "success", value: qrValue });
    } else if (param === "connect_whatsapp") {
      const client_connected = await check_client_auth();
      res.status(200).json({ message: "success", value: client_connected });
    } else if (param === "get_groups") {
      const get_groups = await get_groups_data();
      res.status(200).json({ message: "success", value: get_groups });
    } else {
      res.status(400).json({ message: "Invalid parameter" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
}
