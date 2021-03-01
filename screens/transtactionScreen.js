import React from "react"
import{Text , View , TouchableOpacity, StyleSheet} from "react-native"
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from "expo-permissions"
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null ,
            scanned: false ,
            scannedData: "",
            buttonState: "normal",

        }
    }
     getCameraPermission = async ()=>{
         const {status}= await Permissions.askAsync(Permissions.CAMERA)
         this.setState({
             hasCameraPermissions:status == "granted", scanned:false, buttonState:"clicked"
         })
     }
     handleBarcodeScanner = async({type,data}) =>{
         this.setState({scanned:true , scannedData:data , buttonState: "normal"})
     }
     
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState == "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanner}
                style = {StyleSheet.absoluteFillObject}/>
            ) 
        }
        else if (buttonState === "normal"){

       

        return (
            <View style = {styles.container}>
                <Text style = {styles.displayText}> {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"}  </Text>
                <TouchableOpacity onPress = {this.getCameraPermission}>
                    <Text>scan QR code</Text>
                    </TouchableOpacity>
                    </View>
               
        )
    }
 }
}
const styles = StyleSheet.create({
    container: {flex:1 , justifyContent:"center" , alignItems: "center"}, 
    displayText: {fontSize:20, textDecorationLine:"underline", fontFamily: "dimbo"},
    scanButton:{backgroundColor:"teal", margin: 10 }
})