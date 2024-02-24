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
