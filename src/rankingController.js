const RankingModel = require('./rankingModel');

exports.getRanking = async (req, res) => {
    try {
        const rankings = await RankingModel.getRankings();
        res.status(200).json(rankings);
    } catch (error) {
        console.error('Error al obtener ranking:', error);
        res.status(500).json({ error: 'Error al obtener el ranking' });
    }
};

exports.updateRanking = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        const rankingData = await RankingModel.updateRanking(startDate, endDate);
        res.status(200).json(rankingData);
    } catch (error) {
        console.error('Error al actualizar el ranking:', error);
        res.status(500).json({ error: 'Error al actualizar el ranking' });
    }
};
