import React, { useState } from 'react'
import { Dimensions, Animated, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, ImageBackgroundBase, Image } from 'react-native'
// import Cards from '../components/Cards'
import { darkGreen } from '../components/Constants'
import Map from '../components/Map'
import data from "../data.json"



function Home() {
    const [moto, setMoto] = useState({})

    const NearScooter = () => {
        console.log(moto)
        setMoto({
            latitude: 31.293058,
            longitude: -5.2350038,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>

                <Map moto={moto} />

                <TouchableOpacity
                    onPress={() => { NearScooter }}
                    style={{
                        position: "absolute",
                        backgroundColor: "#e8e8e8",
                        borderRadius: 100,
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        paddingVertical: 5,
                        padding: 60,
                        bottom: 20,
                        left: 150,
                        borderWidth: 2,
                        borderColor: "white"
                        // right: 'auto'

                    }}>
                    <ImageBackground
                        source={require('../assets/e-scooter.png')}
                        style={{
                            flex: 2,
                            resizeMode: "cover",
                            justifyContent: "center",
                            width: 50,
                            padding: 10,

                        }}
                        imageStyle={{ borderRadius: 6 }}
                    />
                </TouchableOpacity>

            </SafeAreaView>

        </>
    )
}

export default Home