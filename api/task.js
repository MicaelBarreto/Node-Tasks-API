const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimatedAt' , '<', date)
            .orderBy('estimatedAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.desc.trin()){
            return res.status(400).send('Description Needed!')
        }

        req.body.uderId = req.user.id

        app.db('tasks')
            .insert(rea.body)
            .then(_ => req.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0){
                    res.status(204).send()
                } else {
                    const msg = 'There is no user with id like $(req.params.id)'
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userI: req.user.id })
            .first()
            .then(task => {
                if(!task) {
                    const msg = `There is no task with these id $(req.params.id)`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(reqa, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    return { getTasks, save, remove, toggleTask }
}