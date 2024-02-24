import mongoose from "mongoose";

const PlanSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        title: String,
        desc: String,
        from: String,
        to: String,
        city: String,
        peopleinterested: []
      
    },
    {
        timestamps: true,
    }
    );

var PlanModel = mongoose.model("Plans", PlanSchema);

export default PlanModel;