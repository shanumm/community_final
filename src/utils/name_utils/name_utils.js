export const name_availabilty = async (name) => {
  try {
    const response = await fetch(
      `/api/page_url?process=name_check&param=${name}`
    );
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const update_page_url_api = async (name, email, uid, original_url) => {
  try {
    const response = await fetch(
      `/api/page_url?process=update_name&param=${name}&email=${email}&user_id=${uid}&ori=${original_url}`
    );
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const add_new_url = async (name, user_id) => {
  console.log(name, user_id, ">>>>>>>>>add new url");
  try {
    const response = await fetch(
      `/api/page_url?process=add_new_url&param=${name}&user_id=${user_id}`
    );
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const delete_url = async (name) => {
  try {
    const response = await fetch(
      `/api/page_url?process=delete_url&param=${name}`
    );
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const add_user_profile = async (name) => {
  console.log(name);
  try {
    const response = await fetch(
      `/api/page_url?process=add_user_profile&param=${name}`
    );
    const data = await response.json();

    if (data.message == "success") {
      return data;
    } else {
      throw new Error("some error occurred");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
