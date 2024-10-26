// Helper function for making API requests
const fetchFromApi = async (query) => {
  try {
    const response = await fetch(`/api/page_url?${query}`);
    const data = await response.json();

    if (data.message === "success") {
      return data;
    } else {
      throw new Error("Some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Specific API request functions using the helper
export const name_availability = async (name) => {
  const query = `process=name_check&param=${name}`;
  return await fetchFromApi(query);
};

export const update_page_url_api = async (name, email, user_data) => {
  const query = `process=update_name&param=${name}&email=${email}&user_data=${JSON.stringify(
    user_data
  )}`;
  return await fetchFromApi(query);
};

export const add_new_user_data = async (name, user_id) => {
  const query = `process=add_new_user_data&param=${name}&user_id=${user_id}`;
  return await fetchFromApi(query);
};

export const delete_url = async (name) => {
  const query = `process=delete_url&param=${name}`;
  return await fetchFromApi(query);
};

export const add_user_profile = async (name, user_data) => {
  const query = `process=add_user_profile&param=${name}&user_data=${JSON.stringify(
    user_data
  )}`;
  return await fetchFromApi(query);
};
