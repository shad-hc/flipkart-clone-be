import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name : {
        type : String,
        required : [true,'name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true,'email is required'],
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : [true,'password is required'],
        minLength : 6,
        select : true
    },

    role : {
        type : String,
        enum : ['user','admin'],
        default : 'admin'
    },
    avatar : {
        url : String,
    },
    addresses: [
        {
          label:    { type: String },              // Home, Office, etc.
          street:   { type: String },
          city:     { type: String },
          state:    { type: String },
          zip:      { type: String },
          country:  { type: String, default: 'India' },
          isDefault:{ type: Boolean, default: false },
        },
      ],
      isActive : {
        type : Boolean,
        default : true
      }
})


export const userModel = mongoose.model('User',userSchema);
