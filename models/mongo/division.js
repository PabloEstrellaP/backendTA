import pkg from 'mongoose'
const { Schema, model } = pkg

const divisionSchema = Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  housingSector: {
    type: [Schema.Types.ObjectId],
    ref: 'HousingSector',
    require: [true, 'housingSector is require'],
  },
  IT: {
    type: [Schema.Types.ObjectId],
    ref: 'IT',
    require: [true, 'IT is require'],
  },
  automobile: {
    type: [Schema.Types.ObjectId],
    ref: 'Automobile',
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

export default model('Division', divisionSchema)
