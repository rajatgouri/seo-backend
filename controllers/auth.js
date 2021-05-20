const db = require('../models');
const jwt = require('jsonwebtoken')


const User = db.user;
const Cat = db.category

const bcrypt = require('bcryptjs')


exports.login = async (req, res) => {
    try {
        const email = req.body.data.email
        const password = req.body.data.password

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.json({ status: 'error', error: 'Email is not register' })
        }
        if (await bcrypt.compare(password, user.password)) {

            // create jwt token send to frontend
            const token = await jwt.sign({ id: user.email },
                process.env.JWT_SECRET)
            return res.json({ status: 'ok', token })


        } else {
            return res.json({ status: 'error', error: 'Password not matching' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: 'error', msg: err.message });
    }
}


exports.signup = async (req, res) => {
    try {
        const fullName = req.body.user.fullName;
        const plainText = req.body.user.password;
        const email = req.body.user.email;

        const password = await bcrypt.hash(plainText, 10)

        const user = await User.create({
            fullName, password, email
        })
        try {
            await user.save()
            return res.json({ status: 'ok' })
        } catch (err) {
            return res.json({ status: 'error' })
        }
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
}


exports.category = async (req, res) => {
    try {
        const { cat } = req.body
        await Cat.create({
            cat
        }).then(() => {
            return res.status(200).json({ status: 'ok' })
        })
    } catch (error) {
        if (error) throw error
    }
}

exports.catDel = async (req, res) => {
    try {
        const id = req.params.id
        await Cat.destroy({
            where: {
                id
            }
        }).then(d => {
            if (d === 1) {
                return res.status(200).json({ status: 'ok' })
            } else {
                return res.status(400).json({ status: 'error' })
            }
        })
    } catch (error) {
        return res.status(404).json({ status: 'error', error: 'server error' })
    }
}

exports.dashboard = async (req, res) => {
    const token = req.headers['token']
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            where: {
                email: decoded
            }
        })
        if (!user) {
            console.log('invalid user')
            return res.status(404).json({ status: error, error: 'invalid user' })
        }
        console.log('valid user')
        return res.status(200).json({ status: 'ok', data: user })
    } catch (error) {
        return res.status(404).json({ status: 'error',error:'server fail' })
    }
}