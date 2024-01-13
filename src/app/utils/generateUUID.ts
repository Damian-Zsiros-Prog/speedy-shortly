export const generarUUID = () => {
  return "xxxxxxx".replace(/x/g, () => ((Math.random() * 36) | 0).toString(36))
}
