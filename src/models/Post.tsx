import mongoose  from "mongoose";
const {Schema, models} = mongoose;

const PostSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        desc : {
            type: String,
            required: true,
        },
        img: {
            type:String,
            required:true,
        },
        content: {
            type: String,
            required: true,
        
        }, 
        userName: {
            type: String, 
            required: true, 
        }
    },
    {timestamps: true}
)

const mod = models.Posts || mongoose.model("Posts", PostSchema) ;
export default mod;


