export const get_user_details = async (email) => {
  console.log(email, "this is email");
  try {
    const response = await fetch(`/api/get_user_detailss?param=${email}`);
    const data = await response.json();
    console.log(data, ">>>>>>>>>>>>");
    if (data.message == "success") {
      return data;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
