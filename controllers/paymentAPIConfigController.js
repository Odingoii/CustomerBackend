const PaymentAPIConfig = require('../models/PaymentAPIConfig');

const addConfig = async (req, res) => {
  try {
    const { provider, credentials, environment } = req.body;

    // Check if configuration already exists for the provider/environment
    const existingConfig = await PaymentAPIConfig.findOne({ provider, environment });
    if (existingConfig) {
      return res.status(400).json({ message: 'Configuration for this provider and environment already exists' });
    }

    const newConfig = new PaymentAPIConfig({ provider, credentials, environment });
    await newConfig.save();

    res.status(201).json({ message: 'Configuration saved successfully', config: newConfig });
  } catch (error) {
    res.status(400).json({ message: 'Error saving configuration', error: error.message });
  }
};

const getConfig = async (req, res) => {
  try {
    const { provider } = req.params;

    // Retrieve configuration for the specified provider
    const config = await PaymentAPIConfig.findOne({ provider, environment: 'production' }); // Default to production environment
    if (!config) {
      return res.status(404).json({ message: `No configuration found for provider ${provider}` });
    }

    res.status(200).json(config);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving configuration', error: error.message });
  }
};

module.exports = {
  addConfig,
  getConfig,
};
