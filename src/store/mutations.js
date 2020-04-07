export default {
  CHANGE_STATE (state, payload) {
    console.log(payload)
    for (let name in payload) {
      state[name] = payload[name]
    }
  }
}
