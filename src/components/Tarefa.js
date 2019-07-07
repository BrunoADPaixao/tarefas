import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commmonStyles from '../commonStyles'

export default props => {
    let check = null
    if (props.doneAt !== null){
        check = (
            <View style={styles.done}>
                <Icon name='check' color={commmonStyles.colors.secondary} />
            </View>
        )
    } else {
        check = <View style={styles.pending} />
    }

    const descStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {}

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTarefa(props.id)} >
                <View style={styles.checkContainer}>{check}</View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, descStyle]}>{props.desc}
                </Text>
                <Text style={styles.date}>
                {moment(props.estimatedAt).locale('pt-br').format('ddd, D [de] MMMM')}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending: { // tarefa pendente
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: { // tarefa concluida
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#407031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: commmonStyles.fontFamily,
        color: commmonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commmonStyles.fontFamily,
        color: commmonStyles.colors.subText,
        fontSize: 12,
    }
})