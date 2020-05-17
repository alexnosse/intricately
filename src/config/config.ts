const cardsConfig = Object.freeze({
  SUITS: 'HDCS',
  VALUES: '2AKQJ09876543',
});

enum PileType {
  ROTATION = 'rotation',
  ORDERED = 'ordered',
}

export default { cardsConfig, PileType };
