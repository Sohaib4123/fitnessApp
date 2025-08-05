import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ExerciseList({ data }: { data: any }) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: hp(55) }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <ExerciseCard index={index} item={item} router={router} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({
  index,
  item,
  router,
}: {
  index: number;
  item: any;
  router: any;
}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index + 200)
        .springify()}
    >
      <TouchableOpacity
        className="flex py-3 space-y-2"
        onPress={() => {
          router.push({ pathname: "/exerciseDetails", params: item });
        }}
      >
        <View className="border-neutral-200 shadow rounded-[25px]">
          <Image
            style={{ width: wp(44), height: wp(52), borderRadius: 25 }}
            source={{ uri: item.gif }}
            contentFit="cover"
          />
        </View>
        <Text
          style={{ fontSize: hp(1.7) }}
          className="text-neutral-700 font-semibold ml-1 tracking-wide"
        >
          {item?.name?.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
