import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const LIKES_API = "http://localhost:4000/api";

export const findAllLikes = async () => {
  const response = await request.get(`${LIKES_API}/likes`);
  return response.data;
};
export const createUserLikesAlbum = (userId, mediaId) => {
  const response = request.post(
    `${LIKES_API}/users/${userId}/likes/${mediaId}`
  );
  return response.data;
};
export const findAlbumsUserLikes = (userId) => {
  const response = request.get(`${LIKES_API}/users/${userId}/likes`);
  return response.data;
};
export const findUsersWhoLikeAlbum = (mediaId) => {
  const response = request.get(`${LIKES_API}/albums/${mediaId}/likes`);
  return response.data;
};