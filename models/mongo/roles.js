import pkg from 'mongoose'
const { Schema, model } = pkg

const rolesScheme = Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  permissions: {
    type: Object,
    require: [true, 'objects of permissions is require'],
  },
  creationDate: {
    type: Date
  },
  updateDate: {
    type: Date
  }
})

rolesScheme.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model('Role', rolesScheme)
