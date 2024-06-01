import express from 'express'
import { deleteController, getData, insertData } from './stdnt.controller'

const router = express.Router()

router.post('/insert-data', insertData)

router.get('/get-data', getData)

router.delete('/delete/:id', deleteController)



export const routers = router
 
 