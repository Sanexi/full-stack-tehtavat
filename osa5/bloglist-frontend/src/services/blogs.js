import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getToken = () => {
  return token
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl} / ${id}`, newObject)
  return req.then(response => response.data)
}

const like = async (blogId, blogObj) => {
  const updateUrl = baseUrl+`/${blogId}`
  const response = await axios.put(updateUrl, blogObj)
  return response.data
}

const deleteBlog = async (blogId, token) => {
  const deleteUrl = baseUrl+`/${blogId}`
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  }
  const response = await axios.delete(deleteUrl, config, blogId)
  return response.data
}

export default { getAll, create, update, setToken, getToken, removeToken, like, deleteBlog}
