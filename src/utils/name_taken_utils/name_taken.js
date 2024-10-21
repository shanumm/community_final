export const name_availabilty = async (name) => {
  try {
    const response = await fetch(`/api/name_availabilty?param=${name}`);
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
