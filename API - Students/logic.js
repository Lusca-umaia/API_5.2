const urlStudents = fetch('https://apigenerator.dronahq.com/api/g4C15xPP/students')
const urlTasks = fetch('https://apigenerator.dronahq.com/api/75U0yEKU/tasks')
const urlGrades = fetch('https://apigenerator.dronahq.com/api/5Bba_f-L/grades')

function naming(dataStudent, id) {
    let nameStudent = dataStudent.filter(item => item.id == id)
    console.log(`Nome do Estudante: ${nameStudent[0].Name}`)
}


async function functionGroup() {
    //values APIs
    const responseStudent = await urlStudents
    const dataStudent = await responseStudent.json()

    const responseTasks = await urlTasks
    const dataTasks = await responseTasks.json()

    const responseGrades = await urlGrades
    const dataGrades = await responseGrades.json()
    // -- 

    //Função que retorna o nome do estudante, as atividades realizadas e as suas respectivas notas
    function returnDeliveres(id) {
        let ArrayTask = []
        let ArrayNota = []

        naming(dataStudent, id)


        searchTask = dataGrades.filter(item => item.studentId == id)

        for (let index = 0; index <
            searchTask.length; index++) {
            ArrayTask.push(
                searchTask[index].taskId)
            ArrayNota.push(
                searchTask[index].number)
        }

        for (let index = 0; index < ArrayTask.length; index++) {
            let TarefasRe = dataTasks.filter(item => item.id == ArrayTask[index])
            console.log(`Tarefa realizada: ${TarefasRe[0].title} - Nota: ${ArrayNota[index]}`)
        }

    }
    // --

    //Função que retorna o nome do estudante e sua média de notas
    function returnAverage(id) {
        let ArrayNota = []
        let Sum = 0, avarage = 0

        naming(dataStudent, id)


        searchTask = dataGrades.filter(item => item.studentId == id)

        for (let index = 0; index <
            searchTask.length; index++) {
            ArrayNota.push(
                searchTask[index].number)
        }

        for (let index = 0; index < ArrayNota.length; index++) {
            Sum += parseInt(ArrayNota[index])
        }
        avarage = (Sum / ArrayNota.length)
        console.log(`Média de notas: ${avarage.toFixed(2)}`)
    }
    //--

    //Função que retorna o nome do usuário, o título das atividades realizadas e das pendentes
    function returnTaksPending(id) {
        let TasksP = [], TasksC = []
        let arrayTask = [], arrayComparison = [1, 2, 3, 4, 5, 6]

        naming(dataStudent, id)


        searchTask = dataGrades.filter(item => item.studentId == id)

        for (let index = 0; index <
            searchTask.length; index++) {
            arrayTask.push(
                searchTask[index].taskId)
        }

        for (i = 0; i < arrayComparison.length; i++) {
            for (let index = 0; index < arrayTask.length; index++) {
                if (arrayComparison[i] == parseInt(arrayTask[index])) {
                    arrayComparison.splice(i, 1)
                    i--
                }
            }
        }

        for (let index = 0; index < arrayTask.length; index++) {
            let Save = dataTasks.filter(item => item.id == arrayTask[index])
            TasksC.push(Save[0].title)
        }

        for (let index = 0; index < arrayComparison.length; index++) {
            let Save = dataTasks.filter(item => item.id == arrayComparison[index])
            TasksP.push(Save[0].title)
        }

        console.log(`Tarefas Realizadas: `, TasksC)
        console.log(`Tarefas Pendentes: `, TasksP)
    }
    // --

    //Função que retorna as notas e os usuários que realizaram uma determinada atividade
    function taksCompleted(task) {
        let taskReference
        let gradeId
        let studentId = []

        taskReference = dataTasks.filter((item) => item.title == task)
        gradeId = dataGrades.filter((item) => item.taskId == taskReference[0].id)

        gradeId.forEach((item) => studentId.push(item.studentId))

        dataStudent.forEach((item) => {
            for (let index = 0; index < studentId.length; index++) {
                if (item.id == studentId[index]) {
                    let nota
                    nota = gradeId.filter((value) => value.studentId == item.id)
                    console.log(`Nome do estudante: ${item.Name} \nNota: ${nota[0].number}\n`)
                }
            }
        })

    }
    // -- 

    //returnDeliveres(4)
    //returnAverage(4)
    //returnTaksPending(2)
    taksCompleted('Colocando em prática 1.1')
}

functionGroup()

//Cada função deve ser inicializada individualmente - descomentar quando for utilizar;