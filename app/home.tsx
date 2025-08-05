import BodyParts from "@/components/bodyParts";
import ImageSlider from "@/components/imageSlider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
    return (
        // <View>
        //     <Text>
        //         this is home!!
        //     </Text>
        // </View>
        <SafeAreaView className="flex-1 flex space-y-5 bg-white" edges={["top"]}>
            <StatusBar style="dark" />
            <View className="flex-row justify-between items-center mx-5">
                <View className="space-y-2">
                    <Text style={{ fontSize: hp(4.5) }} className="text-neutral-700 font-bold tracking-wider">
                        Ready To
                    </Text>
                    <Text style={{ fontSize: hp(4.5) }} className="text-rose-400 font-bold tracking-wider">
                        Workout
                    </Text>
                </View>
                <View className="flex justify-center items-center space-y-2">
                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={{ width: hp(6), height: hp(6) }}
                        className="rounded-full"
                    />
                    <View className="flex justify-center items-center border-[3px] border-neutral-300 rounded-full bg-neutral-200 my-2"
                    style={{height: hp(5.5), width: wp(10)}}
                    >
                        <Ionicons name="notifications" size={hp(3)} color="gray" />
                    </View>
                </View>
            </View>
            {/* Image Slider */}
            <View>
                <ImageSlider/>
            </View>
            {/* Body Parts */}
            <View>
                <BodyParts/>
            </View>
        </SafeAreaView>
    );
}

export default Home;