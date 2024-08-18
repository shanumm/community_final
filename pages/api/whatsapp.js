const { Client, LocalAuth } = require("whatsapp-web.js");

let client;

const initializeClient = () => {
  if (!client) {
    client = new Client({
      authStrategy: new LocalAuth({
        dataPath: "./pages/api/whatsapp_auth_test",
      }),
    });
    client.initialize();
  }
};

const get_qr = () => {
  initializeClient();
  return new Promise((resolve, reject) => {
    if (!client.info?.wid) {
      client.once("qr", (qr) => {
        console.log("QR RECEIVED");
        resolve(qr);
      });
    } else {
      resolve(null);
    }
  });
};

const check_client_auth = () => {
  initializeClient();

  return new Promise((resolve, reject) => {
    if (client.info?.wid) {
      // Client is already connected
      console.log("Client is already connected!");
      resolve(true);
    } else {
      client.once("ready", () => {
        console.log("Client is ready!");
        resolve(true);
      });
    }

    client.on("auth_failure", () => {
      console.log("Authentication failed!");
      reject(new Error("Authentication failed"));
    });
  });
};

const get_groups_data = () => {
  initializeClient();
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

  if (param === "get_qr") {
    try {
      const qrValue = await get_qr();
      res.status(200).json({ message: "success", value: qrValue });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred", error: err.message });
    }
  } else if (param === "connect_whatsapp") {
    try {
      const client_connected = await check_client_auth();
      res.status(200).json({ message: "success", value: client_connected });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred", error: err.message });
    }
  } else if (param == "get_groups") {
    const get_groups = await get_groups_data();
    res.status(200).json({ message: "success", value: get_groups });
  } else {
    res.status(400).json({ message: "Invalid parameter" });
  }
}
