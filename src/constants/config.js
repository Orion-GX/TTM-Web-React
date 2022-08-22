// export const apiUrl = "https://pilot.terminal8.co.th/api";
// export const apiUrl = "http://10.88.88.68:3010/api";
// export const imageUrl = "https://pilot.terminal8.co.th/api";
// export const uploadUrl = "http://10.88.88.68:3021";
// export const getFile = "http://10.88.88.68:3021/files";
export const apiUrl = `${process.env.REACT_APP_API_URL}`;
export const IMAGE_URL = `${process.env.REACT_APP_GET_FILE_URL}/files/`;
export const UPLOAD_URL = `${process.env.REACT_APP_GET_FILE_URL}`;
export const getFile = `${process.env.REACT_APP_GET_FILE_URL}/files/`;

export const server = {
  LOGIN_URL: `/auth/sign_in`,
  EQUIPMENT_SEARCH: `/equipment/search`,
  EQUIPMENT_DETAIL: `/equipment/`,
  EQUIPMENT_ADD: `/equipment/add`,
  EQUIPMENT_EDIT: `/equipment/edit/`,
  EQUIPMENT_TYPE: `/equipment/type`,
  EQUIPMENT_IMAGE_UPLOAD: `/upload`,
  CONTRACT_SEARCH: `/contract/search`,
};
