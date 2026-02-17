// Main API Router
module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Dream Living PG API',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': 'Submit enquiry',
            'GET /api/health': 'Health check'
        }
    });
};
