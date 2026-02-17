// Health Check Endpoint
module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Dream Living PG API is running!',
        timestamp: new Date().toISOString(),
        endpoints: {
            contact: '/api/contact',
            health: '/api/health'
        }
    });
};
