import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Tarefa from '../components/Tarefa'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

export default class Agenda extends Component {
    state = {
        tasks: [
            { id: Math.random(), desc: 'Implementar estados para as tarefas',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Incluir muitas tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Implementar scroll na agenda',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Modificar o status das tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Salvar as alterações',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Executar o emulador android',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'adb devices - checar os dispositivos conectados - cmd',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Gerar 1° APK desta versão do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Gerar 1° APK do aplicativo',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Finalizar o App Tarefas',
                estimateAt: new Date(), doneAt: null },
        ],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false, //mostrar ou exibir o modal
    }

    // funcao adicionar tarefa
    addTask = task => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, 
            this.filterTasks)
    }

    filterTasks = () => { // funcao para filtrar tarefas pendentes ou todas as tarefas
        let visibleTasks = null
        if (this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        } else {
            const pendingTasks = task => task.doneAt === null // variavel filtro
            visibleTasks = this.state.tasks.filter(pendingTasks) // funcao filter com filtro pendingTasks
        }
        this.setState({ visibleTasks })
    }

    toogleFilter = () => { // funcao arrow sem parametros que cuida da alternancia do filtro (tarefas pendentes)
        this.setState({ showDoneTasks: !this.state.showDoneTasks } // mexendo no estado (this.state)
            , this.filterTasks ) // 2° parametro da funcao informa qual metodo sera chamado por ela 
    }
     
    componentDidMount = () => { 
        /* componentDidMount é um metodo do react que
         executa algo assim que o componente é renderizado */ 
        this.filterTasks()
    }

    toggleTarefa = id => {
        const tasks = this.state.tasks.map(task => {
            if (task.id === id){
                task = {...task}
                task.doneAt = task.doneAt ? null: new Date()
            } 
            return task
        })
        this.setState({ tasks }, this.filterTasks )
    }

    // toggleTarefa = id => {
    //     const tasks = [...this.state.tasks]
    //     tasks.forEach(task => {
    //         if (task.id === id){
    //             task.doneAt = task.doneAt ? null: new Date()
    //         }
    //     })
    //     this.setState({ tasks })
    // }
    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false}) }>

                </AddTask>
                <ImageBackground source={todayImage} // imagem de fundo do topo
                    style={styles.background} >
                        <View style={styles.iconBar} >
                            <TouchableOpacity onPress={ this.toogleFilter } >
                                <Icon name={ this.state.showDoneTasks ? 'eye': 'eye-slash' } size={20} color={ commonStyles.colors.secondary } />
                            </TouchableOpacity>
                        </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                   <FlatList data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => 
                        <Tarefa {...item} toggleTarefa={this.toggleTarefa} />}
                   />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                    onPress={ () => { this.setState({ showAddTask: true }) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})