export default {
  INITHISTORY (state, payload) {
    state.stageHistory.push(payload)
    state.stageHistoryStep = 0
  },

  PUSHHISTORY (state, payload) {
    state.stageHistory.push(payload)
    state.stageHistoryStep += 1
  },

  CLEARHISTORY (state) {
    state.stageHistory = []
    state.stageHistoryStep = 0
  },

  UNDO (state) {
    if (state.stageHistoryStep === 0) return
    state.stageHistoryStep -= 1
  },

  REDO (state) {
    const { stageHistoryStep, stageHistory } = state
    if (stageHistoryStep === stageHistory.length - 1) return
    state.stageHistoryStep += 1
  }
}
