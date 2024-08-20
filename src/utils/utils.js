// whatsapp functions

export const get_whatsapp_qr_code = async () => {
  try {
    const response = await fetch("/api/whatsapp?param=get_qr");
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("QR code not found in response");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const connect_whatsapp_client = async () => {
  try {
    const response = await fetch("/api/whatsapp?param=connect_whatsapp");
    const data = await response.json();
    if (data.message == "success") {
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const get_whatsapp_groups = async () => {
  try {
    const response = await fetch("/api/whatsapp?param=get_groups");
    const data = await response.json();
    if (data.message == "success") {
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const add_whatsapp_participants_in_group = async (
  number = [],
  group
) => {
  try {
    const response = await fetch(
      `/api/whatsapp?param=add_participant&number=${number}&group=${group}`
    );
    const data = await response.json();
    if (data.message == "success") {
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
