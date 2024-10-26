export const get_profile_details = async (user_id) => {
  try {
    const response = await fetch(`/api/get_profile_details?user_id=${user_id}`);
    const data = await response.json();
    if (data.message == "success") {
      return data;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
