import axiosClient from "./axiosClient";

const songApi = {
  getAll(params) {
    const url = "/api/songs";
    return axiosClient.get(url, { params: params });
  },

  get(id) {
    const url = `/audio/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "api/songs/upload";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/audio/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/audio/${id}`;
    return axiosClient.delete(url);
  },
};

export default songApi;
