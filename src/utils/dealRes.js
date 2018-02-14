const dealRes = (res, code, data) => {
  if (code) {
    res.send({
      code: code,
      status: 'error',
      message: data,
      data: null,
    })
    res.end()
  } else {
    res.send({
      code: 200,
      status: 'success',
      message: 'success',
      data: data,
    })
    res.end()
  }
}

export default dealRes
