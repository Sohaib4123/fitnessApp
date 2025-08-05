import Anticons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';

type ExerciseParams = {
    id?: string;
    name?: string;
    gif?: string;
    bodyPart?: string;
    target?: string;
    secondaryMuscles?: string;
    description?: string;
    difficulty?: string;
    instructions?: string;
    equipment?: string;
    category?: string;
};

const ExerciseDetails: React.FC = () => {
    const router = useRouter();
    const item = useLocalSearchParams() as ExerciseParams;
    // console.log("Data of Exercise Details: ", item)

    // const parsedInstructions = (() => {
    //     if (typeof item.instructions === 'string') {
    //         try {
    //             const parsed = JSON.parse(item.instructions);
    //             return Array.isArray(parsed) ? parsed : [];
    //         } catch {
    //             return [];
    //         }
    //     } else if (Array.isArray(item.instructions)) {
    //         return item.instructions;
    //     }
    //     return [];
    // })();
    return (
        <View className="flex flex-1">
            <View className="shadow-md bg-neutral-200 rounded-b-[40px]">
                <Image
                    source={{ uri: item.gif }}
                    contentFit="cover"
                    style={{ width: wp(100), height: wp(100), borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
                />
            </View>

            <TouchableOpacity
                onPress={() => router.back()}
                className="mx-2 absolute rounded-full mt-2 right-3 top-4"
            >
                <Anticons name="closecircle" size={hp(4.5)} color="#f43f5e" />
            </TouchableOpacity>

            {/* Details */}
            <ScrollView className='mx-4 space-y-2 mt-3' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
                <Animated.Text
                    entering={FadeInDown.delay(100).duration(300).springify()}
                    style={{ fontSize: hp(3.5) }}
                    className="font-semibold text-neutral-800 tracking-wide mb-2"
                >
                    {item.name?.toLocaleUpperCase()}
                </Animated.Text>
                <Animated.Text
                entering={FadeInDown.delay(200).duration(300).springify()}
                    style={{ fontSize: hp(2) }}
                    className="text-neutral-700 tracking-wide mb-2"
                >
                    Equipment: <Text

                        className="font-bold text-neutral-800 "
                    >
                        {item?.equipment}
                    </Text>
                </Animated.Text>
                <Animated.Text
                entering={FadeInDown.delay(300).duration(300).springify()}
                    style={{ fontSize: hp(2) }}
                    className="text-neutral-700 tracking-wide mb-2"
                >
                    Secondary Muscles:  <Text

                        className="font-bold text-neutral-800 "
                    >
                        {item?.secondaryMuscles}
                    </Text>
                </Animated.Text>
                <Animated.Text
                entering={FadeInDown.delay(400).duration(300).springify()}
                    style={{ fontSize: hp(3) }}
                    className="font-semibold text-neutral-800 tracking-wide"
                >
                    Instructions:
                </Animated.Text> 
                        {item?.instructions?.split(',').map((instruction: string, index: number) => {
                            return (
                                <View key={index}>
                                    <Animated.Text 
                                    entering={FadeInDown.delay(500).duration(300).springify()}
                                    className="text-base text-neutral-700 mb-1">
                                        {`\u2022 ${instruction.trim()}`}
                                    </Animated.Text>
                                </View>
                            )
                        })}
                    
                
            </ScrollView>
        </View>
    );
};

export default ExerciseDetails;
