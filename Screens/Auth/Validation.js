import * as yup from "yup";
import { ref } from "yup";

export const signinschema = yup.object().shape({
  email: yup.string().email("Please enter valid Email").required('Email Address is Required'),
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
})

export const signupschema = yup.object().shape({
  email: yup.string().email("Please enter valid Email").required('Email Address is Required'),
  name: yup.string().required('Please Enter Your Name'),
  number: yup.number().required('Please Enter Your Mobile Number').min(10 , "required"),
  password: yup.string().required('Please create a password'),
})


export const otpSchema = yup.object().shape({
  otpNumber: yup.number().required('Please enter OTP').min(6 , 'OTP Have 6 numbers')
})


export const tellUsSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  gender: yup.string().required('Please select your gender'),
  workyoudo: yup.string().required('Please select your work'),
  wherelive: yup.string().required('Select where you live'),
  workingHours: yup.string().required('Select your working hours')
})

export const profileEditSchema = yup.object().shape({
  email: yup.string().email("Please enter valid Email").required('Email Address is Required'),
  name: yup.string().required('Please Enter Your Name'),
  number: yup.number().required('Please Enter Your Mobile Number').min(10 , "required"),
  // password: yup.string().required('Please create a password'),
})


export const walletAdderSchema = yup.object().shape({
  amount: yup.number().required('Please Enter Amount').min(10 , "required"),
})

export const forgotPassword = {
  email: ""
}

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Please enter valid Email").required('Email Address is Required'),
})  