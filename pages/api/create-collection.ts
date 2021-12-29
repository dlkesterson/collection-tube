import { NextApiHandler } from 'next';
const sequelize = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    let transaction: any;

    try {
        transaction = await sequelize.transaction();
        let newCollection = {
            name: req.body.name
        };

        await sequelize.models.Collection.create(newCollection, { transaction });
        await transaction.commit();
        res.status(200).send(newCollection);
    } catch (e: any) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

export default handler
