const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const time = require('date-and-time')


const User = db.user;
const Cat = db.category;
const Blog = db.Blog;


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
    const plainText = req.body.user.password;
    const email = req.body.user.email;
    const fullName = req.body.user.fullName;

    try {
        const u = await User.findOne({where:{
            email 
        }})
        if(u){
            return res.json({status: 'error', error:'user already present'})
        }
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

    try {
        console.log('\n\ntry block\n\n')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            where: {
                email: decoded.id
            }
        })
        if (!user) {
            console.log('invalid user')
            return res.status(404).json({ status: error, error: 'invalid user' })
        }
        return res.status(200).json({ status: 'ok', data: user })
    } catch (error) {
        return res.status(404).json({ status: 'error', error: 'server fail' })
    }
}

exports.blog = async (req, res) => {
    const draft = false
    const { title, summary, url, latest } = req.body
    console.log(title, summary, url, latest, draft)

    const currentTime = time.format(new Date(), 'HH:mm:ss YYYY/MM/DD ')

    const category = ['Arun', 'pratap', 'singh']

    try {
        await Blog.create({
            title, summary, url, latest, draft, currentTime, category
        })
        return res.json({ status: 'ok' })
    } catch (error) {
        return res.json({status : 'error' , error: 'error'})
    }

}