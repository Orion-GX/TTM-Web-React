// export const apiUrl = "https://pilot.terminal8.co.th/api";
// export const apiUrl = "http://10.88.88.68:3010/api";
// export const imageUrl = "https://pilot.terminal8.co.th/api";
// export const uploadUrl = "http://10.88.88.68:3021";
// export const getFile = "http://10.88.88.68:3021/files";
export const apiUrl = `${process.env.REACT_APP_API_URL}`;
export const imageUrl = `${process.env.REACT_APP_API_URL}`;
export const uploadUrl = `${process.env.REACT_APP_API_URL}`;
export const getFile = `${process.env.REACT_APP_GET_FILE_URL}`;

export const server = {
  LOGIN_URL: `/auth/sign_in`,
  EQUIPMENT_SEARCH: `/equipment/search`,
  EQUIPMENT_DETAIL: `/equipment/`,

  REPORT_URL: `report`,
  TOKEN_KEY: `token`,
  ACCESS_TOKEN: `access_token`,
  REFRESH_TOKEN: `refresh_token`,
  UUID: `uuid`,
  FIRST_NAME: `first_name`,
  LAST_NAME: `last_name`,
  PHONE: `phone_number`,
  EMAIL: `email`,
  ROLE_ID: `role_id`,
  ROLE_NAME: `role_name`,
  STATUS: `status`,
  IMAGE: `image`,
  USER_ID: `id`
};
