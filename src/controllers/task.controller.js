import { Task } from "../models/Task.js"

export const getTasks = async (req, res) => {
    try {
        // throw new Error('query failed') //ERROR DE PRUEBA
        const task = await Task.findAll()
        res.json(task)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: {
                id,
            }
        });
        if (!task) return res.status(404).json({ message: "Task does not exists" });  //SI NO EXISTE DEVUELVE UN ERROR
        res.json(task)  //SI LO ENCUENTRA DEVUELVE EL OBJETO ENCONTRADO
    } catch (error) {
        return res.Status(500).json({ message: error.message });
    }
}



export const createTask = async (req, res) => {
    const { name, done, projectId } = req.body

    try {
        const newTask = await Task.create({
            name,
            done,
            projectId
        });

        res.json(newTask)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: { id }
        })
        task.set(req.body); //EL SET ACTUALIZA TODO LO QUE VENGA POR BODY Y SI NO EXISTE ALGUN ATRIBUTO NO HACE NADA
        await task.save()  //ACTUALIZA EL OBJETO DE LA BASE DE DATOS
        return res.json(task);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.destroy({
            where: {
                id,
            }
        });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}