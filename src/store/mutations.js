export default {
  setState (state, payload) {
    console.log(payload)
    for (let name in payload) {
      state[name] = payload[name]
    }
  },
  
  // 初始化画布数据历史
  initHistory (state, payload) {
    const { main, board } = payload
    state.mainHistory = main
    state.boardHistory = board
    state.mainHistoryId = main[0].id
    state.boardHistoryId = board[0].id
  },

  
  // pushHistory (state, payload) {
    
  // }
}
