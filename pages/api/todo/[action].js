export default async function handler(req, res) {
    const incCard = {
        id: 1,
        title: 'Hello',
        description: 'Incomplete Todo',
        completed: false,
        createdBy: 'Admin'
    }

    const compCard = {
        id: 2,
        title: 'World',
        description: 'Completed Todo',
        completed: true,
        createdBy: 'Admin'
    }

    const data = [
        incCard,
        compCard
    ]

    res.status(200).json({data: data})
}