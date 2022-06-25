// import React, { useState } from "react";
// import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
// import { Formik } from "formik";
// import * as Yup from "yup";

// import WelcomeHeader from "../components/welcomeHeader";
// import SubmitButton from "../components/submitButton";
// import Screen from "../components/Screen";
// import ErrorMessage from "../components/ErrorMessage";
// import AppFormField from "../components/AppFormField";
// import client from "../API/client";

// // const validationSchema = Yup.object().shape({
// //   email: Yup.string().required().email().label("Email"),
// //   password: Yup.string().required().min(4).max(12).label("Password"),
// // });

// function RegisterScreen(props) {
//   const login = async (values, formikActions) => {
//     //console.log(values);
//     const res = await client.post("/auth/login", {
//       ...values,
//     });
//     console.log(res.data);
//     formikActions.resetForm();
//     formikActions.setSubmitting(false);
//   };

//   const [isSecured, setSecured] = useState(true);

//   return (
//     // full screen
//     <View style={{flex: 1}}>
//       {/* container with the headers */}
//       <View style={styles.topFlex}>
//         <WelcomeHeader topLine="Hey there," bottomLine="Create an Account" />
//       </View>

//       {/* <View style={styles.all}> */}
//         <Formik initialValues={{ email: "", password: "" }} onSubmit={login}>
//           {({ handleSubmit }) => (
//             <>
//               {/* email input*/}
//               <View style={styles.inputFlex}>
//               <AppFormField
//                 name="email"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 hint={"Email"}
//                 iconName="mail"
//                 iconSize={15}
//                 isSecured={false}
//                 keyboardType="email-address"
//                 textContentType="emailAddress"
//               />
//               {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}

//               {/* password input */}
//                 <AppFormField
//                   name="password"
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   hint="Password"
//                   iconName="lock"
//                   iconSize={15}
//                   isSecured={isSecured}
//                   password={true}
//                   showImage={<Text>Show</Text>}
//                   textContentType="password"
//                 />
//                 {/* forgot password */}
//                 <Text style={styles.recoverPwd}>
                  
//                   Forgot your password?
//                 </Text></View>
              

//               {/* container with the register button and text below */}
//               <View style={styles.buttonFlex}>
//                 <SubmitButton
//                   text=" Login"
//                   iconName={"login"}
//                   iconSize={18}
//                   onPress={handleSubmit}
//                 />
//               </View>
//             </>
//           )}
//         </Formik>

//         <View style={styles.bottomFlex}>
//           <Text style={{ margin: 10 }}> or </Text>

//           <Text>
//             Don't have an account yet?
//             <Text style={{ color: "#c25ced" }}> Register </Text>
//           </Text>
//         </View>
//       {/* </View> */}

//       {/* </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   all: {
//     // flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     backgroundColor: "yellow",
//   },

//   topFlex: {
//     flex: 1,
//     justifyContent: "center",
    
//   },

//   bottomFlex: {
//     flex: 1,
//     alignItems: "center",
//     //marginBottom: "20%",
//     justifyContent: "flex-end",
//     backgroundColor: "red",
//   },

//   // btnPosition: {
//   //   alignItems: "center",
//   //   width: "80%",
//   // },

//   buttonFlex: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "green",
//   },

//   inputFlex: {
//     flex: 1,
//     justifyContent: "center",
//     // alignItems: "center",
//     backgroundColor: "blue",
//   },

//   recoverPwd: {
//     color: "#a9abb0", // text color - ash
//     textDecorationLine: "underline",
//     marginTop: 15,
//     textAlign: "center",
//   },
// });

// export default RegisterScreen;
