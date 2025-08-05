import { bodyParts } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const BodyPartCard = ({index, item, router}: {index:number, item:any, router:any}) => {
        return(
            <Animated.View entering={FadeInDown.duration(400).delay(index+200).springify()}>
                <TouchableOpacity
                    onPress={() => {router.push({pathname:'/exercise', params:{name: item.name}})}}
                    className='flex justify-end p-4 mb-4'
                    style={{width:wp(44), height:wp(52)}}
                >
                    <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{width:wp(44), height:wp(52)}}
                        className='rounded-[35px] absolute'

                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.9)']}
                        style={{width:wp(44), height:hp(15), borderBottomRightRadius:35, borderBottomLeftRadius:35}}
                        start={{x:0.5, y:0}}
                        end={{x:0.5, y:1}}
                        className='absolute bottom-0'
                    />
                    <Text
                        style={{fontSize:hp(2.5)}}
                        className='text-white font-bold tracking-wide text-center'
                    >
                        {item?.name}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
}

const BodyParts = () => {
    const router = useRouter();
    return (
        <View className='mx-4'>
            <Text className='font-bold text-neutral-700' style={{fontSize:hp(3)}}>
                Exercises
            </Text>

            <FlatList
                data={bodyParts}
                numColumns={2}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop:20, paddingBottom: hp(55)}}
                columnWrapperStyle={{justifyContent:"space-between"}}
                renderItem={({item, index}) => <BodyPartCard index={index} item={item} router={router}/>}

            />
        </View>
    );
}

export default BodyParts;