const toyervice = require('./toy.service.js')

const logger = require('../../services/logger.service')

async function getToy(req, res) {
  try {
    const filterBy = {
      txt: req.query.txt || ''
    }
    logger.debug('Getting Toy', filterBy)
    const toy = await toyervice.query(filterBy)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyervice.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  const {loggedinUser} = req

  try {
    const toy = req.body
    toy.owner = loggedinUser
    const addedToy = await toyervice.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}


async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyervice.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    await toyervice.remove(toyId)
    res.send()
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addToyMsg(req, res) {
  const {loggedinUser} = req
  try {
    const toyId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await toyervice.addToyMsg(toyId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToyMsg(req, res) {
  const {loggedinUser} = req
  try {
    const toyId = req.params.id
    const {msgId} = req.params

    const removedId = await toyervice.removeToyMsg(toyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy msg', err)
    res.status(500).send({ err: 'Failed to remove toy msg' })

  }
}

module.exports = {
  getToy,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addToyMsg,
  removeToyMsg
}
