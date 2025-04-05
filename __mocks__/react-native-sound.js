jest.mock('react-native-sound');

class Sound {
  static setCategory() {}
  constructor(fileName, base, callback) {
    callback && callback(null);
  }
  play(callback) {
    if (callback) callback(true);
  }
  stop(callback) {
    if (callback) callback();
  }
  release() {}
}

module.exports = Sound;
