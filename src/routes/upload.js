import express from 'express'
import multer from 'multer'
import sizeOf from 'image-size'
import dealRes from '../utils/dealRes'

const router = express.Router()

// 上传文件配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const nameNow = file.originalname.match(/^(.+)\.(.+)$/)
    if (nameNow) {
      cb(null, `${nameNow[1].slice(0, 5)}_${Date.now()}.${nameNow[2]}`)
    } else {
      cb(null, false)
    }
  },
})

// var upload = multer({ dest: 'uploads/' });
const upload = multer({ storage })

// 上传图片
router.post('/', upload.single('file'), async (req, res, next) => {
  const { file } = req
  console.log(file)
  if (file) {
    const dime = sizeOf(file.path)
    return dealRes(res, 0, Object.assign(file, { detail: dime }))
  }
  return dealRes(res, 1, '上传失败')
})

export default router
