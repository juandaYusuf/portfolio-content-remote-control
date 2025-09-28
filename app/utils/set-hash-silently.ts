export default (hash : string) => {
  history.replaceState(history.state, '', hash)
}
