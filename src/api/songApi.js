import axiosClient from "./axiosClient";

const songApi = {
  getAll(search) {
    const url = "/api/songs";
    return axiosClient.get(url, search);
  },

  search(data) {
    const url = "/api/songs/search";
    return axiosClient.post(url, data);
  },

  get(id) {
    const url = `/audio/${id}`;
    return axiosClient.get(url);
  },

  getMyUpload() {
    const url = "api/songs/myupload";
    return axiosClient.get(url);
  },

  add(data) {
    const url = "api/songs/upload";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `api/songs/upload/${data.get("id")}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `api/songs/upload/${id}`;
    return axiosClient.delete(url);
  },
};

export default songApi;
