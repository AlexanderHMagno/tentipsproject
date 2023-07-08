
import mongoose  from "mongoose";
const {Schema, model, models} = mongoose;



const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required:true,
    },
})

export default models.Users || model("Users", UserSchema);