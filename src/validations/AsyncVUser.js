const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const AsyncVUser = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.UserID)) {
      throw { UserID: 'That username is taken' }
    }
  })
}

export default AsyncVUser