const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3001;

// It could have a CORS error if not implemented
app.use(cors());


app.use(cors({
    origin: '*' // This is for testing reasons, it's recommended to use only the ip it's going to communicate with
  }));

  app.get('/api/countries', async (req, res) => {
    try {
      const countriesData = await axios.get(`${process.env.COUNTRY_API_URL}/AvailableCountries`);
  
      const flagData = await axios.get(`${process.env.POPULATION_API_URL}/flag/images`);
      const flagDataMap = flagData.data.data.reduce((map, flag) => {
        map[flag.iso2] = flag.flag;
        return map;
      }, {});
  
      // Merge the flag data with country data
      const countriesWithFlags = countriesData.data.map(country => ({
        ...country,
        flag: flagDataMap[country.countryCode] || null, // Add flag URL if found, otherwise set to null
      }));
  
      res.json(countriesWithFlags);
    } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ message: 'Error fetching countries' });
    }
  });

  app.get('/api/country/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const countryInfo = await axios.get(`${process.env.COUNTRY_API_URL}/CountryInfo/${code}`);

        const flagResponse = await axios.get(`${process.env.POPULATION_API_URL}/flag/images`);
        const foundFlag = flagResponse.data.data.find(flag => flag.iso2 === code);
        
        let populationData = null;

        try {
            const populationResponse = await axios.get(`${process.env.POPULATION_API_URL}/population`);
            // Attempt to find the population data using the foundFlag's iso3 code
            if (foundFlag) {
                const foundPopulation = populationResponse.data.data.find(country => country.iso3 === foundFlag.iso3);
                populationData = foundPopulation ? foundPopulation.populationCounts : null; 
            }
        } catch (error) {
            // Set populationData to null if the request fails
            populationData = null;
        }

        res.json({
            name: countryInfo.data.commonName,
            officialName: countryInfo.data.officialName,
            borders: countryInfo.data.borders,
            populationData: populationData, // Returns null if population fetch fails
            flag: foundFlag ? foundFlag.flag : null, // Returns null if flag fetch fails
        });
    } catch (error) {
        console.error('Error fetching country information:', error);
        res.status(500).json({ message: 'Error fetching country information' });
    }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});