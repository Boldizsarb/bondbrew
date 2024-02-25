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