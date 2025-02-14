import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import liff from '@line/liff';

liff.init({ liffId: '2006905089-jNWvNA0L' });

const route = Router()

/**
 * 接收訊息
 */
route.post('/', asyncHandler(async (req, res) => {

}))


export default route;