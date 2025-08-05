import { fetchExercisesByBodyPart } from "@/api/exerciseDB";
import ExerciseList from "@/components/exerciseList";
import { bodyParts } from "@/constants"; // Update path if needed
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";

type RouteParams = {
  name?: string; // passed via router.push({ params: { name: 'back' } })
};

const Exercise: React.FC = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams<RouteParams>();
  const [exercises, setExercises] = useState<any[]>();

  useEffect(() => {
    if (name) getExercises(name);
  }, [name]);

  const getExercises = async (bodyPart: any) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    setExercises(data);
    // console.log("Got Data: ", data)
  };
  // Find matching body part and image
  const imageSource: ImageSourcePropType | undefined = bodyParts.find(
    (part) => part.name.toLowerCase() === name?.toLowerCase()
  )?.image;

  return (
    <ScrollView>
      <StatusBar style="light" />
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: wp(100), height: hp(45) }}
          className="rounded-b-[40px]"
        />
      ) : (
        <Text className="text-center mt-10 text-red-600 font-bold">
          No image found for {name}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 absolute flex justify-center items-center rounded-full mt-7 ml-5"
        style={{ height: hp(5), width: hp(5) }}
      >
        <Ionicons
          name="caret-back-outline"
          size={hp(4)}
          color="white"
          className="relative right-0.5"
        />
      </TouchableOpacity>
      {/* Exercises */}
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {name} exercises
        </Text>
        <View>
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Exercise;
