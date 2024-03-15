import mongoose from "mongoose";




const MatchSchema = mongoose.Schema(
    {
        userfromid: {
            type: String,
            required: true,
        },
        usertoid:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)

const MatchModel= mongoose.model("Matches", MatchSchema);

export default MatchModel