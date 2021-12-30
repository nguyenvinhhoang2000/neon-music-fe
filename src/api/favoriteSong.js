import axiosClient from "./axiosClient";

const favoriteSong = {
  getAll(params) {
    const url = "/api/favorite-song";
    return axiosClient.get(url, { params: params });
  },

  like(data) {
    const url = "/api/favorite-song";
    return axiosClient.post(url, data);
  },

  disLike(id) {
    const url = `/api/favorite-song/${id}`;
    return axiosClient.delete(url);
  },
};

export default favoriteSong;
