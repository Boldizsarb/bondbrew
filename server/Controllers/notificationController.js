import NotificationModel from "../Models/notificationModel.js";



export const createNotification = async (req, res) => {

    const newNotification = new NotificationModel(req.body);
    
    try {
        await newNotification.save();
        res.status(200).json(newNotification);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getNotifications = async (req, res) => {

    const userto = req.body.userto;

    try {
        const notifications = await NotificationModel.find( { userto: userto });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessageNotifications = async (req, res) => {

    const userto = req.body.userto;
    const type = "message"
    try {
        const notifications = await NotificationModel.find( { userto: userto, type: type});
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createMessageNotification = async (req, res) => {
    const userfrom = req.body.userfrom; // sender
    const userto = req.body.userto; // receiver

    try {
        const existingNotification = await NotificationModel.findOne({ // checking if it exist
            userfrom: userfrom,
            userto: userto,
            type: "message"
        });

   
        if (!existingNotification) { // if it doesnt
            const newNotification = new NotificationModel({
                userfrom: userfrom,
                userto: userto,
                type: "message"
            });

            await newNotification.save();
            res.status(201).json(newNotification);
        } else {
            res.status(200).json({ message: "Notification already exists", notification: existingNotification });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const deleteNotification = async (req, res) => {
    const userfrom = req.body.userfrom;
    const userto = req.body.userto;

    try {      // check if exists
        const result = await NotificationModel.deleteOne({
            userfrom: userfrom,
            userto: userto,
            type: "message"
        });
    
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Notification deleted" });
        } else {
            // no message needed sincve it would convolute the console
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}


// const existingNotification = await NotificationModel.findOne({
//     userfrom: userfrom,
//     userto: userto,
//     type: "message"
// });

// if (existingNotification) {
//     await existingNotification.remove();
//     res.status(200).json({ message: "Notification deleted" });
// } else {
//     res.status(404).json({ message: "Notification not found" });
// }