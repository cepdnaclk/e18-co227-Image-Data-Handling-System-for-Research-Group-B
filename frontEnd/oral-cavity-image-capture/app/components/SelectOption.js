import React, { Component } from "react";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import colors from "../Config/colors";

// how to get the screen dimensions
// see if this works when screen is rotated ( if not watch React Native Tutorial 1:25:00 )
// const windowWidth = Dimensions.get("window");

const SelectOption = ({dataSet, hint, thisHeight, fontSize}) => {
  return (
    <SelectDropdown
      data={dataSet}
      defaultButtonText={hint}
      renderDropdownIcon={() => {
        return <IconAntDesign name={"down"} color={"#bab5b6"} style={{paddingEnd: 10}}/>;
      }}
      buttonTextStyle={{
        color: "#bab5b6",
        fontSize: fontSize,
        textAlign: "left",

      }}
      buttonStyle={{
        borderColor: colors.ash,
        height: thisHeight,
        width: "90%",
        borderRadius: 15,
        backgroundColor: colors.ash,
        marginBottom: 10,
        paddingEStart: 20,
        
      }}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

export default SelectOption;
