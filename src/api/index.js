import axiosClient from './apiClient';

export const Api = {
  get: async ({ url, options }) => {
    const onSuccess = (response) => {
      return response.data;
    };

    const onError = (error) => {
      return Promise.reject(error.response);
    };

    return axiosClient.get(url, options).then(onSuccess).catch(onError);
  },

  post: async ({ url, data, options }) => {
    const onSuccess = (response) => {
      return response.data;
    };

    const onError = (error) => {
      return Promise.reject(error.response);
    };

    return axiosClient.post(url, data, options).then(onSuccess).catch(onError);
  },

  put: async ({ url, data, options }) => {
    const onSuccess = (response) => {
      return response.data;
    };

    const onError = (error) => {
      return Promise.reject(error.response);
    };

    return axiosClient.put(url, data, options).then(onSuccess).catch(onError);
  },

  delete: async ({ url, options }) => {
    const onSuccess = (response) => {
      return response.data;
    };

    const onError = (error) => {
      return Promise.reject(error.response);
    };

    return axiosClient.delete(url, options).then(onSuccess).catch(onError);
  },
};
