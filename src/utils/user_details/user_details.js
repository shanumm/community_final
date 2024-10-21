export const get_user_details = async (email) => {
  try {
    const response = await fetch(`/api/get_user_details?param=${email}`);
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("email not found");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
