import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';


function Cards({ item, setMoto }) {
    return (
        <TouchableOpacity >
            <View style={styles.container} onTouchEnd={() => { setMoto(item) }}>
                <ImageBackground
                    source={require(`../assets/images/image-01.webp`)}
                    style={{
                        flex: 2,
                        resizeMode: "cover",
                        justifyContent: "center",
                        width: 160,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                    imageStyle={{ borderRadius: 6 }}
                />


                <View style={styles.textContainer}>
                    <Text style={styles.text}  >
                        {item.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '70%'
    },

    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        textAlign: "center"
    }
});
export default Cards