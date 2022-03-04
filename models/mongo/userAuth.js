import pkg from 'mongoose'
const { Schema, model } = pkg

const userAuthScheme = Schema({
  userName: {
    type: String,
    unique: true,
    require: [true, 'userName is require']
  },
  password: {
    type: String,
    require: [true, 'password is require']
  },
  personalData: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'personalData is require']
  },
  rol: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    require: [true, 'rol is require'],
  },
  creationDate: {
    type: Date
  },
  updateDate: {
    type: Date
  },
  isDelete: {
    type: Boolean,
    default: false
  }
})

userAuthScheme.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model('UserAuth', userAuthScheme)
