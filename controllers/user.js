import { response } from 'express'

export const getUser = (req, res = response) => {
  const { q = '' } = req.query

  res.json({
    msg: 'get api',
    q
  })
}

export const putUser = (req, res = response) => {
  const { id } = req.params

  res.status(400).json({
    msg: 'put api',
    id
  })
}

export const postUser = (req, res = response) => {
  const { name, age } = req.body

  res.status(201).json({
    msg: 'post api',
    name,
    age
  })
}

export const deleteUser = (req, res = response) => {
  res.json({
    msg: 'delete api'
  })
}
