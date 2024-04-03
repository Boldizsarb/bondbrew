import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
    {
        userfrom: { type: String, required: true },
        userto: { type: String, required: true },
        type: { type: String, required: true }
    },
    {
        timestamps: true,
    }
    );

const NotificationModel = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;