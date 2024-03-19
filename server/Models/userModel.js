import mongoose from "mongoose";


const UserSchema = mongoose.Schema(
    {           // attributes of the
        username: {
            type: String,
            required: true,
            unique: true

        },
        password : {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname : {
            type: String,
            required: true
        },
        isAdmin : {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        country: String,
        relationship: String,
        mostinterestedin: String,
        hobbies: String,
        gender: String,
        lat: Number,
        long: Number,
        bio: String,
        interests: [],
        followers: [] ,
        following: []
    },
    {timestamps: true}
)

const UserModel= mongoose.model("Users", UserSchema);


export default UserModel