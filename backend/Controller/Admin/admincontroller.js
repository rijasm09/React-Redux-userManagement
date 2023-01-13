const { json } = require("express");
const { NotBeforeError } = require("jsonwebtoken");
const userSchema = require("../../models/userSchema");
const notesSchema = require("../../models/notesSchema");

exports.searchUser = async (req, res) => {
  try {
    let username = req.body.searchkeyword;
    userSchema
      .find({ firstname: { $regex: ".*" + username + ".*", $options: "i" } })
      .then((data) => {
        res.status(200).json(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  let id = req.query.id;
  console.log("DEKEE UzxczczczxcxzcD " + id);
  try {
    notesSchema.deleteMany({ userid: id });
    userSchema
      .deleteOne({ _id: id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json("Some error Occured");
      });
  } catch (error) {
    res.status(400).json(err.message);
  }








};

// exports.updateUser=(req,res)=>{
//   console.log("update",req.body);
//   adminHelpers.doUpdateUser(req.body).then((data)=>{
//     //  if(data == true){
//     //   res.status(400).json("email is already there")
//     //  }else{
//       console.log(data);
//       res.status(200).json(data)
//     //  }
//   })
// }

exports.updateUser = async (req, res) => {
  // let id = req.query.id;

  // console.log(id + "THIS IS THE PHOYO");
  console.log("TJHO O _ JAFDKAJSFHD FJLKLJKDSHF KHFJKLSDH FJSKDHF ");
  console.log("update", req.body);

  try {
    console.log("insd try");
    userSchema
      .updateOne({ _id: req.body.id }, { $set: { firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email   } })
      .then((data) => {
        console.log("database updated data",data);
        res.status(200).json("DATA UPDATED");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
  }

};

