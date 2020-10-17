const getDeclension = (word) => {
  if ((word.charAt(word.length - 2) === 'о') &&
      ((word.charAt(word.length - 3) === "ш") ||
          (word.charAt(word.length - 3) === "ж"))) {
    return word.slice(0, -2) + 'их';
  } else if (word.charAt(word.length - 2) === 'о') {
    return word.slice(0, -2) + 'ых';
  }
  return word.slice(0, -1) + 'х';
}


module.exports = { getDeclension };
