import pkg from 'mongoose'
const { Schema, model } = pkg

const permissionScheme = Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  description: {
    type: String,
    require: [true, 'description is require'],
  },
  creationDate: {
    type: Date
  }
})

permissionScheme.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model('Permission', permissionScheme)
