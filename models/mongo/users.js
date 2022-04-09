import pkg from 'mongoose'
const { Schema, model } = pkg

const UserScheme = Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  lastName: {
    type: String,
    require: [true, 'lastName is require'],
  },
  phone: {
    type: String,
    require: [true, 'Phone is require']
  },
  email: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  creationDate: {
    type: Date,
    require: [ true, 'creationDate is require']
  },
  updateDate: {
    type: Date,
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
})

UserScheme.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model('User', UserScheme)
