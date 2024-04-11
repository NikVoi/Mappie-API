const express = require('express')
const fetch = require('isomorphic-fetch')
const cors = require('cors')

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000

app.get('/places', async (req, res) => {
	try {
		const { location, radius, key, pagetoken, types } = req.query

		let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${key}&language=ru`

		if (types) {
			url += `&types=${types}`
		}

		if (pagetoken) {
			url += `&pagetoken=${pagetoken}`
		}

		console.log(url)

		const response = await fetch(url)

		const data = await response.json()

		res.json(data)
	} catch (error) {
		console.error('Error fetching places:', error)
		res.status(500).json({ error: 'Error fetching places' })
	}
})

app.get('/place-details', async (req, res) => {
	try {
		const { placeId, key } = req.query

		const url = `https://places.googleapis.com/v1/places/${placeId}?fields=*&key=${key}`

		const response = await fetch(url)
		const data = await response.json()

		res.json(data)
	} catch (error) {
		console.error('Error fetching place details:', error)
		res.status(500).json({ error: 'Error fetching place details' })
	}
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
