import PlanModel from "../Models/planModel.js";
import mongoose from "mongoose";

export const createPlan = async (req, res) => {
  const newPlan = new PlanModel(req.body);

  try {
    await newPlan.save();
    res.status(200).json(newPlan);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getPlanById = async (req, res) => {
  const id = req.params.id;

  try {
    const plan = await PlanModel.findById(id);
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getLimitedPlans = async (req, res) => {
  try {
    //const plans = await PlanModel.find();
    const plans = await PlanModel.aggregate([ // getting 7 random plans
      { $sample: { size: 7 } }
    ]);
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const interestedIn = async (req, res) => {
  const planid = req.params.id; // plan id

  const { userId } = req.body; // current user
  const plan = await PlanModel.findById(planid);
  if (plan.peopleinterested.includes(userId)) {
    res.status(403).json("You are already interested in this plan");
  }else if (plan.userId === userId) {
    res.status(403).json("This is your plan!");
  } 
  else {
    try {
      await plan.updateOne({ $push: { peopleinterested: userId } });
      res.status(200).json("Your name was added to the list");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};


export const uninterestedIn = async (req, res) => {
  const planid = req.params.id; // plan id

  const { userId } = req.body; // current user
  const plan = await PlanModel.findById(planid);
  if (!plan.peopleinterested.includes(userId)) {
    res.status(403).json("You are already interested in this plan");
  }else if (plan.userId === userId) {
    res.status(403).json("This is your plan!");
  } 
  else {
    try {
      await plan.updateOne({ $pull: { peopleinterested: userId } });
      res.status(200).json("Your name was removed from the list");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

export const deletePlan = async (req, res) => {
  const planid = req.params.id;
  const { userId } = req.body;
  const plan = await PlanModel.findById(planid);
  
  if (plan.userId !== userId) {
    res.status(403).json("You can delete only your plan");
  } else {
    try {
      await PlanModel.findByIdAndDelete(planid);
      res.status(200).json("Plan has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


export const updatePlan = async (req, res) => {

  const planid = req.params.id;
  const { userId, title, desc, city, from, to, lat, lng } = req.body;

  const plan = await PlanModel.findById(planid);

  if (plan.userId !== userId) {
    res.status(403).json("You can update only your plan");
  } else {
    try {
      await PlanModel.findByIdAndUpdate(planid, {
        $set: {
          ...(title && { title }), // Only add to update if provided
          ...(desc && { desc }),
          ...(city && { city }),
          ...(from && { from }),
          ...(to && { to }),
          ...(lat && { lat }),
          ...(lng && { lng }),
        },
      },
      { new: true } // Return the updated document
    );
      res.status(200).json("Plan has been updated...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}


export const getPlanByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const plan = await PlanModel.find({ title: { $regex: title, $options: "i" } });
    res.status(200).json(plan);
  }
  catch (error) {
    res.status(500).json(error);
  }
}