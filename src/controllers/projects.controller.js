
import { Project } from "../models/Project.js"
import { Task } from "../models/Task.js"

export const getProjects = async (req, res) => {
    try {
        // throw new Error('query failed') //ERROR DE PRUEBA
        const projects = await Project.findAll()
        res.json(projects)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            where: {
                id,
            }
        });
        if (!project) return res.status(404).json({ message: "Project does not exists" });  //SI NO EXISTE DEVUELVE UN ERROR
        res.json(project)  //SI LO ENCUENTRA DEVUELVE EL OBJETO ENCONTRADO
    } catch (error) {
        return res.Status(500).json({ message: error.message });
    }

}

export const createProject = async (req, res) => {
    const { name, priority, description } = req.body

    try {
        const newProject = await Project.create({
            name,
            priority,
            description
        });

        res.json(newProject)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    // res.send('creating Projects')
}

export const updateProject = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, priority, description } = req.body;

        const project = await Project.findByPk(id);
        project.name = name,
            project.priority = priority,
            project.description = description,

            await project.save()  //ACTUALIZA EL OBJETO DE LA BASE DE DATOS
        res.json(project)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await Project.destroy({
            where: {
                id,
            }
        });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProjectTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await Task.findAll({
            where: { projectId: id },
        });
        res.json(tasks)  //SI LO ENCUENTRA DEVUELVE EL OBJETO ENCONTRADO
    } catch (error) {
        return res.Status(500).json({ message: error.message });
    }

}